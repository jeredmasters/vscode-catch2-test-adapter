//-----------------------------------------------------------------------------
// vscode-catch2-test-adapter was written by Mate Pek, and is placed in the
// public domain. The author hereby disclaims copyright to this source code.

import { TestDecoration, TestEvent, TestInfo } from 'vscode-test-adapter-api';
import * as xml2js from 'xml2js';

import { C2TestSuiteInfo } from './C2TestSuiteInfo';
import { generateUniqueId } from './IdGenerator';

export class C2TestInfo implements TestInfo {
  readonly type: 'test' = 'test';
  readonly id: string;
  readonly label: string;
  readonly skipped: boolean;
  readonly testNameTrimmed: string;

  constructor(
    id: string | undefined,
    public readonly testNameFull: string,
    description: string,
    tags: string[],
    public readonly file: string,
    public readonly line: number,
    public readonly parent: C2TestSuiteInfo,
  ) {
    this.testNameTrimmed = this.testNameFull.trim();
    this.skipped = tags.some((v: string) => {
      return v.startsWith('[.') || v == '[hide]';
    }) ||
      this.testNameFull.startsWith('./');
    this.label = C2TestInfo._generateLabel(this.testNameFull, description, tags);
    this.id = id ? id : generateUniqueId();
  }

  private static _generateLabel(
    testNameFull: string, description: string, tags: string[]): string {
    return testNameFull + (tags.length > 0 ? ' ' + tags.join('') : '');
  }

  getEscapedTestName(): string {
    /*',' has special meaning */
    let t = this.testNameFull;
    t = t.replace(/,/g, '\\,')
    t = t.replace(/\[/g, '\\[');
    t = t.replace(/\*/g, '\\*');
    if (t.startsWith(' ')) t = '*' + t.substr(1);
    return t;
  }

  getStartEvent(): TestEvent {
    return { type: 'test', test: this, state: 'running' };
  }

  getSkippedEvent(): TestEvent {
    return { type: 'test', test: this, state: 'skipped' };
  }

  parseAndProcessTestCase(xmlStr: string, rngSeed: number | undefined):
    TestEvent {
    let res: any = undefined;
    new xml2js.Parser({ explicitArray: true })
      .parseString(xmlStr, (err: any, result: any) => {
        if (err) {
          throw err;
        } else {
          res = result;
        }
      });

    return this._processXmlTagTestCase(res.TestCase, rngSeed);
  }

  private _processXmlTagTestCase(testCase: any, rngSeed: number | undefined):
    TestEvent {
    try {
      let message = undefined;
      let decorations = undefined;
      let success = false;
      [message, decorations, success] =
        this._processXmlTagTestCaseInner(testCase, '');

      if (rngSeed) {
        message =
          'Randomness seeded to: ' + rngSeed.toString() + '\n' + message;
      }

      const testEvent: TestEvent = {
        type: 'test',
        test: this,
        state: success ? 'passed' : 'failed',
        message: message.length ? message : undefined,
        decorations: decorations.length ? decorations : undefined
      };

      return testEvent;
    } catch (e) {
      throw e;
    }
  }

  private _processXmlTagTestCaseInner(testCase: any, title: string):
    [string, TestDecoration[], boolean] {
    title = testCase.$.name + '(line: ' + testCase.$.line + ')';
    let message = '';
    let decorations: TestDecoration[] = [];
    let success = false;

    if (testCase.OverallResult[0].$.success === 'true') {
      success = true;
    }

    if (testCase.OverallResult[0].$.hasOwnProperty('durationInSeconds')) {
      message += 'Duration: ' + testCase.OverallResult[0].$.durationInSeconds +
        ' second(s)\n';
    }

    if (testCase.hasOwnProperty('Expression')) {
      for (let j = 0; j < testCase.Expression.length; ++j) {
        try {
          let messageL = undefined;
          let decorationsL = undefined;
          [messageL, decorationsL] =
            this._processXmlTagExpressionInner(testCase.Expression[j], title);
          message += messageL;
          decorations = decorations.concat(decorationsL);
        } catch (error) {
        }
      }
    }

    if (testCase.hasOwnProperty('Section')) {
      for (let j = 0; j < testCase.Section.length; ++j) {
        try {
          let messageL = undefined;
          let decorationsL = undefined;
          [messageL, decorationsL] =
            this._processXmlTagSectionInner(testCase.Section[j], title);
          message += messageL;
          decorations = decorations.concat(decorationsL);
        } catch (error) {
        }
      }
    }

    return [message, decorations, success];
  }

  private _processXmlTagExpressionInner(expr: any, title: string):
    [string, TestDecoration[]] {
    let message = '';
    let decorations: TestDecoration[] = [];

    message += '>>> ' + title + ' ' + expr.$.type + ' (line: ' + expr.$.line +
      ')' +
      ' \n';
    message += '  Original:\n    ';
    message += expr.Original.map((x: string) => x.trim()).join(' | ');
    message += '\n  Expanded:\n    ';
    message += expr.Expanded.map((x: string) => x.trim()).join(' | ') + '\n';
    message += '<<<\n';
    decorations.push({
      line: Number(expr.$.line) - 1 /*It looks vscode works like this.*/,
      message:
        'Expanded: ' + expr.Expanded.map((x: string) => x.trim()).join(' | ')
    });

    return [message, decorations];
  }

  private _processXmlTagSectionInner(section: any, title: string):
    [string, TestDecoration[]] {
    title += ' | ' + section.$.name + '(line: ' + section.$.line + ')';
    let message = '';
    let decorations: TestDecoration[] = [];

    if (section.hasOwnProperty('Expression')) {
      for (let j = 0; j < section.Expression.length; ++j) {
        try {
          let messageL = undefined;
          let decorationsL = undefined;
          [messageL, decorationsL] =
            this._processXmlTagExpressionInner(section.Expression[j], title);
          message += messageL;
          decorations = decorations.concat(decorationsL);
        } catch (error) {
        }
      }
    }

    if (section.hasOwnProperty('Section')) {
      for (let j = 0; j < section.Section.length; ++j) {
        try {
          let messageL = undefined;
          let decorationsL = undefined;
          [messageL, decorationsL] =
            this._processXmlTagSectionInner(section.Section[j], title);
          message += messageL;
          decorations = decorations.concat(decorationsL);
        } catch (error) {
        }
      }
    }

    return [message, decorations];
  }
}
