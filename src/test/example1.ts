import * as assert from 'assert';
import * as path from 'path';
import * as vscode from 'vscode';
import { TestInfo, TestSuiteInfo } from 'vscode-test-adapter-api';

assert.notEqual(vscode.workspace.workspaceFolders, undefined);
assert.equal(vscode.workspace.workspaceFolders!.length, 1);

const workspaceFolderUri = vscode.workspace.workspaceFolders![0].uri;

export const example1 = new class {
  readonly suite1 = new class {
    readonly execPath =
      vscode.Uri.file(path.join(workspaceFolderUri.path, 'execPath1')).fsPath;

    readonly t1 = new class {
      readonly fullTestName = 's1t1';
      assert(label: string, test: TestInfo, uniqeIdContainer?: Set<string>) {
        assert.equal(test.type, 'test');
        assert.equal(test.label, label);
        assert.equal(test.file, 'suite1.cpp');
        assert.equal(test.line, 7 - 1);
        assert.ok(test.skipped == undefined || test.skipped === false);
        if (uniqeIdContainer != undefined) {
          assert.ok(!uniqeIdContainer.has(test.id));
          uniqeIdContainer.add(test.id);
        }
      };

      readonly outputs: [string[], string][] = [
        [
          ['s1t1', '--reporter', 'xml', '--durations', 'yes'],
          `<?xml version="1.0" encoding="UTF-8"?>
            <Catch name="suite1">
              <Group name="suite1">
                <TestCase name="s1t1" description="tag1" filename="../vscode-catch2-test-adapter/src/test/suite1.cpp" line="7">
                  <OverallResult success="true" durationInSeconds="0.000112"/>
                </TestCase>
                <OverallResults successes="1" failures="0" expectedFailures="0"/>
              </Group>
              <OverallResults successes="1" failures="0" expectedFailures="0"/>
            </Catch>`
        ],
        [
          [
            's1t1', '--reporter', 'xml', '--durations', 'yes', '--rng-seed', '2'
          ],
          `<?xml version="1.0" encoding="UTF-8"?>
            <Catch name="suite1">
              <Randomness seed="2"/>
              <Group name="suite1">
                <TestCase name="s1t1" description="tag1" filename="../vscode-catch2-test-adapter/src/test/suite1.cpp" line="7">
                  <OverallResult success="true" durationInSeconds="0.000327"/>
                </TestCase>
                <OverallResults successes="1" failures="0" expectedFailures="0"/>
              </Group>
              <OverallResults successes="1" failures="0" expectedFailures="0"/>
            </Catch>`
        ],
      ];
    };

    readonly t2 = new class {
      readonly fullTestName = 's1t2';
      assert(label: string, test: TestInfo, uniqeIdContainer?: Set<string>) {
        assert.equal(test.type, 'test');
        assert.equal(test.label, label);
        assert.equal(test.file, 'suite1.cpp');
        assert.equal(test.line, 13 - 1);
        assert.ok(test.skipped == undefined || test.skipped === false);
        if (uniqeIdContainer != undefined) {
          assert.ok(!uniqeIdContainer.has(test.id));
          uniqeIdContainer.add(test.id);
        }
      };

      readonly outputs: [string[], string][] = [
        [
          ['s1t2', '--reporter', 'xml', '--durations', 'yes'],
          `<?xml version="1.0" encoding="UTF-8"?>
            <Catch name="suite1">
              <Group name="suite1">
                <TestCase name="s1t2" description="tag1" filename="../vscode-catch2-test-adapter/src/test/suite1.cpp" line="13">
                  <Expression success="false" type="REQUIRE" filename="../vscode-catch2-test-adapter/src/test/suite1.cpp" line="15">
                    <Original>
                      std::false_type::value
                    </Original>
                    <Expanded>
                      false
                    </Expanded>
                  </Expression>
                  <OverallResult success="false" durationInSeconds="0.00075"/>
                </TestCase>
                <OverallResults successes="0" failures="1" expectedFailures="0"/>
              </Group>
              <OverallResults successes="0" failures="1" expectedFailures="0"/>
            </Catch>`
        ],
        [
          [
            's1t2', '--reporter', 'xml', '--durations', 'yes', '--rng-seed', '2'
          ],
          `<?xml version="1.0" encoding="UTF-8"?>
            <Catch name="suite1">
              <Randomness seed="2"/>
              <Group name="suite1">
                <TestCase name="s1t2" description="tag1" filename="../vscode-catch2-test-adapter/src/test/suite1.cpp" line="13">
                  <Expression success="false" type="REQUIRE" filename="../vscode-catch2-test-adapter/src/test/suite1.cpp" line="15">
                    <Original>
                      std::false_type::value
                    </Original>
                    <Expanded>
                      false
                    </Expanded>
                  </Expression>
                  <OverallResult success="false" durationInSeconds="0.000339"/>
                </TestCase>
                <OverallResults successes="0" failures="1" expectedFailures="0"/>
              </Group>
              <OverallResults successes="0" failures="1" expectedFailures="0"/>
            </Catch>`
        ]
      ];
    };

    readonly outputs: [string[], string][] = [
      [['--help'], 'Catch v2.4.1'],
      [
        ['[.],*', '--verbosity', 'high', '--list-tests', '--use-colour', 'no'],
        'Matching test cases:\n' +
        '  s1t1\n' +
        '    suite1.cpp:7\n' +
        '    tag1\n' +
        '  s1t2\n' +
        '    suite1.cpp:13\n' +
        '    tag1\n' +
        '2 matching test cases\n\n'
      ],
      [
        ['--reporter', 'xml', '--durations', 'yes'],
        `<?xml version="1.0" encoding="UTF-8"?>
          <Catch name="suite1">
            <Group name="suite1">
              <TestCase name="s1t1" description="tag1" filename="../vscode-catch2-test-adapter/src/test/suite1.cpp" line="7">
                <OverallResult success="true" durationInSeconds="0.000132"/>
              </TestCase>
              <TestCase name="s1t2" description="tag1" filename="../vscode-catch2-test-adapter/src/test/suite1.cpp" line="13">
                <Expression success="false" type="REQUIRE" filename="../vscode-catch2-test-adapter/src/test/suite1.cpp" line="15">
                  <Original>
                    std::false_type::value
                  </Original>
                  <Expanded>
                    false
                  </Expanded>
                </Expression>
                <OverallResult success="false" durationInSeconds="0.000204"/>
              </TestCase>
              <OverallResults successes="1" failures="1" expectedFailures="0"/>
            </Group>
            <OverallResults successes="1" failures="1" expectedFailures="0"/>
          </Catch>`
      ],
      [
        ['--reporter', 'xml', '--durations', 'yes', '--rng-seed', '2'],
        `<?xml version="1.0" encoding="UTF-8"?>
          <Catch name="suite1">
            <Randomness seed="2"/>
            <Group name="suite1">
              <TestCase name="s1t1" description="tag1" filename="../vscode-catch2-test-adapter/src/test/suite1.cpp" line="7">
                <OverallResult success="true" durationInSeconds="0.001045"/>
              </TestCase>
              <TestCase name="s1t2" description="tag1" filename="../vscode-catch2-test-adapter/src/test/suite1.cpp" line="13">
                <Expression success="false" type="REQUIRE" filename="../vscode-catch2-test-adapter/src/test/suite1.cpp" line="15">
                  <Original>
                    std::false_type::value
                  </Original>
                  <Expanded>
                    false
                  </Expanded>
                </Expression>
                <OverallResult success="false" durationInSeconds="0.000382"/>
              </TestCase>
              <OverallResults successes="1" failures="1" expectedFailures="0"/>
            </Group>
            <OverallResults successes="1" failures="1" expectedFailures="0"/>
          </Catch>`
      ],
      ...this.t1.outputs,
      ...this.t2.outputs,
    ];

    assert(
      label: string, childLabels: string[], suite: TestSuiteInfo,
      uniqeIdContainer?: Set<string>) {
      assert.equal(suite.type, 'suite');
      assert.equal(suite.label, label);
      assert.equal(suite.file, 'suite1.cpp');
      assert.equal(suite.line, 0);
      assert.equal(suite.children.length, 2);
      assert.equal(childLabels.length, suite.children.length);
      this.t1.assert(
        childLabels[0], <TestInfo>suite.children[0], uniqeIdContainer);
      this.t2.assert(
        childLabels[1], <TestInfo>suite.children[1], uniqeIdContainer);
      if (uniqeIdContainer != undefined) {
        assert.ok(!uniqeIdContainer.has(suite.id));
        uniqeIdContainer.add(suite.id);
      }
    }
  };

  readonly suite2 = new class {
    readonly execPath =
      vscode.Uri.file(path.join(workspaceFolderUri.path, 'execPath2')).fsPath;

    readonly t1 = new class {
      readonly fullTestName = 's2t1';
      assert(label: string, test: TestInfo, uniqeIdContainer?: Set<string>) {
        assert.equal(test.type, 'test');
        assert.equal(test.label, label);
        assert.equal(test.file, 'suite2.cpp');
        assert.equal(test.line, 7 - 1);
        assert.ok(test.skipped == undefined || test.skipped === false);
        if (uniqeIdContainer != undefined) {
          assert.ok(!uniqeIdContainer.has(test.id));
          uniqeIdContainer.add(test.id);
        }
      }

      readonly outputs: [string[], string][] = [
        [
          ['s2t1', '--reporter', 'xml', '--durations', 'yes'],
          `<?xml version="1.0" encoding="UTF-8"?>
          <Catch name="suite2">
            <Group name="suite2">
              <TestCase name="s2t1" description="tag1" filename="../vscode-catch2-test-adapter/src/test/suite2.cpp" line="7">
                <OverallResult success="true" durationInSeconds="0.000392"/>
              </TestCase>
              <OverallResults successes="1" failures="0" expectedFailures="0"/>
            </Group>
            <OverallResults successes="1" failures="0" expectedFailures="0"/>
          </Catch>`
        ],
        [
          [
            's2t1', '--reporter', 'xml', '--durations', 'yes', '--rng-seed', '2'
          ],
          `<?xml version="1.0" encoding="UTF-8"?>
          <Catch name="suite2">
            <Randomness seed="2"/>
            <Group name="suite2">
              <TestCase name="s2t1" description="tag1" filename="../vscode-catch2-test-adapter/src/test/suite2.cpp" line="7">
                <OverallResult success="true" durationInSeconds="0.000392"/>
              </TestCase>
              <OverallResults successes="1" failures="0" expectedFailures="0"/>
            </Group>
            <OverallResults successes="1" failures="0" expectedFailures="0"/>
          </Catch>`
        ]
      ];
    };

    readonly t2 = new class {
      readonly fullTestName = 's2t2';
      assert(label: string, test: TestInfo, uniqeIdContainer?: Set<string>) {
        assert.equal(test.type, 'test');
        assert.equal(test.label, label);
        assert.equal(test.file, 'suite2.cpp');
        assert.equal(test.line, 13 - 1);
        assert.ok(test.skipped === true);
        if (uniqeIdContainer != undefined) {
          assert.ok(!uniqeIdContainer.has(test.id));
          uniqeIdContainer.add(test.id);
        }
      }

      readonly outputs: [string[], string][] = [
        [
          ['s2t2', '--reporter', 'xml', '--durations', 'yes'],
          `<?xml version="1.0" encoding="UTF-8"?>
            <Catch name="suite2">
              <Group name="suite2">
                <TestCase name="s2t2" description="tag1 " tags="[.]" filename="../vscode-catch2-test-adapter/src/test/suite2.cpp" line="13">
                  <OverallResult success="true" durationInSeconds="0.001294"/>
                </TestCase>
                <OverallResults successes="1" failures="0" expectedFailures="0"/>
              </Group>
              <OverallResults successes="1" failures="0" expectedFailures="0"/>
            </Catch>`
        ],
        [
          [
            's2t2', '--reporter', 'xml', '--durations', 'yes', '--rng-seed', '2'
          ],
          `<?xml version="1.0" encoding="UTF-8"?>
            <Catch name="suite2">
              <Randomness seed="2"/>
              <Group name="suite2">
                <TestCase name="s2t2" description="tag1 " tags="[.]" filename="../vscode-catch2-test-adapter/src/test/suite2.cpp" line="13">
                  <OverallResult success="true" durationInSeconds="0.001294"/>
                </TestCase>
                <OverallResults successes="1" failures="0" expectedFailures="0"/>
              </Group>
              <OverallResults successes="1" failures="0" expectedFailures="0"/>
            </Catch>`
        ]
      ];
    };

    readonly t3 = new class {
      readonly fullTestName = 's2t3';
      assert(label: string, test: TestInfo, uniqeIdContainer?: Set<string>) {
        assert.equal(test.type, 'test');
        assert.equal(test.label, label);
        assert.equal(test.file, 'suite2.cpp');
        assert.equal(test.line, 19 - 1);
        assert.ok(test.skipped == undefined || test.skipped === false);
        if (uniqeIdContainer != undefined) {
          assert.ok(!uniqeIdContainer.has(test.id));
          uniqeIdContainer.add(test.id);
        }
      }

      readonly outputs: [string[], string][] = [
        [
          ['s2t3', '--reporter', 'xml', '--durations', 'yes'],
          `<?xml version="1.0" encoding="UTF-8"?>
            <Catch name="suite2">
              <Group name="suite2">
                <TestCase name="s2t3" description="tag1" filename="../vscode-catch2-test-adapter/src/test/suite2.cpp" line="19">
                  <Expression success="false" type="REQUIRE" filename="../vscode-catch2-test-adapter/src/test/suite2.cpp" line="21">
                    <Original>
                      std::false_type::value
                    </Original>
                    <Expanded>
                      false
                    </Expanded>
                  </Expression>
                  <OverallResult success="false" durationInSeconds="0.000596"/>
                </TestCase>
                <OverallResults successes="0" failures="1" expectedFailures="0"/>
              </Group>
              <OverallResults successes="0" failures="1" expectedFailures="0"/>
            </Catch>`
        ],
        [
          [
            's2t3', '--reporter', 'xml', '--durations', 'yes', '--rng-seed', '2'
          ],
          `<?xml version="1.0" encoding="UTF-8"?>
            <Catch name="suite2">
              <Randomness seed="2"/>
              <Group name="suite2">
                <TestCase name="s2t3" description="tag1" filename="../vscode-catch2-test-adapter/src/test/suite2.cpp" line="19">
                  <Expression success="false" type="REQUIRE" filename="../vscode-catch2-test-adapter/src/test/suite2.cpp" line="21">
                    <Original>
                      std::false_type::value
                    </Original>
                    <Expanded>
                      false
                    </Expanded>
                  </Expression>
                  <OverallResult success="false" durationInSeconds="0.000596"/>
                </TestCase>
                <OverallResults successes="0" failures="1" expectedFailures="0"/>
              </Group>
              <OverallResults successes="0" failures="1" expectedFailures="0"/>
            </Catch>`
        ]
      ];
    };

    assert(
      label: string, childLabels: string[], suite: TestSuiteInfo,
      uniqeIdContainer?: Set<string>) {
      assert.equal(suite.type, 'suite');
      assert.equal(suite.label, label);
      assert.equal(suite.file, 'suite2.cpp');
      assert.equal(suite.line, 0);
      assert.equal(suite.children.length, 3);
      assert.equal(childLabels.length, suite.children.length);
      this.t1.assert(
        childLabels[0], <TestInfo>suite.children[0], uniqeIdContainer);
      this.t2.assert(
        childLabels[1], <TestInfo>suite.children[1], uniqeIdContainer);
      this.t3.assert(
        childLabels[2], <TestInfo>suite.children[2], uniqeIdContainer);
      if (uniqeIdContainer != undefined) {
        assert.ok(!uniqeIdContainer.has(suite.id));
        uniqeIdContainer.add(suite.id);
      }
    }

    readonly outputs: [string[], string][] = [
      [['--help'], 'Catch v2.4.1'],
      [
        ['[.],*', '--verbosity', 'high', '--list-tests', '--use-colour', 'no'],
        'Matching test cases:\n' +
        '  s2t1\n' +
        '    suite2.cpp:7\n' +
        '    tag1\n' +
        '  s2t2\n' +
        '    suite2.cpp:13\n' +
        '    tag1\n' +
        '      [.]\n' +
        '  s2t3\n' +
        '    suite2.cpp:19\n' +
        '    tag1\n' +
        '3 matching test cases\n\n'
      ],
      [
        ['--reporter', 'xml', '--durations', 'yes'],
        `<?xml version="1.0" encoding="UTF-8"?>
          <Catch name="suite2">
            <Group name="suite2">
              <TestCase name="s2t1" description="tag1" filename="../vscode-catch2-test-adapter/src/test/suite2.cpp" line="7">
                <OverallResult success="true" durationInSeconds="0.00037"/>
              </TestCase>
              <TestCase name="s2t3" description="tag1" filename="../vscode-catch2-test-adapter/src/test/suite2.cpp" line="19">
                <Expression success="false" type="REQUIRE" filename="../vscode-catch2-test-adapter/src/test/suite2.cpp" line="21">
                  <Original>
                    std::false_type::value
                  </Original>
                  <Expanded>
                    false
                  </Expanded>
                </Expression>
                <OverallResult success="false" durationInSeconds="0.000178"/>
              </TestCase>
              <OverallResults successes="1" failures="1" expectedFailures="0"/>
            </Group>
            <OverallResults successes="1" failures="1" expectedFailures="0"/>
          </Catch>`
      ],
      [
        ['--reporter', 'xml', '--durations', 'yes', '--rng-seed', '2'],
        `<?xml version="1.0" encoding="UTF-8"?>
          <Catch name="suite2">
            <Randomness seed="2"/>
            <Group name="suite2">
              <TestCase name="s2t1" description="tag1" filename="../vscode-catch2-test-adapter/src/test/suite2.cpp" line="7">
                <OverallResult success="true" durationInSeconds="0.000113"/>
              </TestCase>
              <TestCase name="s2t3" description="tag1" filename="../vscode-catch2-test-adapter/src/test/suite2.cpp" line="19">
                <Expression success="false" type="REQUIRE" filename="../vscode-catch2-test-adapter/src/test/suite2.cpp" line="21">
                  <Original>
                    std::false_type::value
                  </Original>
                  <Expanded>
                    false
                  </Expanded>
                </Expression>
                <OverallResult success="false" durationInSeconds="0.000205"/>
              </TestCase>
              <OverallResults successes="1" failures="1" expectedFailures="0"/>
            </Group>
            <OverallResults successes="1" failures="1" expectedFailures="0"/>
          </Catch>`
      ],
      ...this.t1.outputs, ...this.t2.outputs, ...this.t3.outputs
    ];
  };

  readonly suite3 = new class {
    readonly execPath =
      vscode.Uri.file(path.join(workspaceFolderUri.path, 'execPath3')).fsPath;

    readonly outputs: [string[], string][] = [

      [
        ['--help'], `
Catch v2.4.1
usage:
  suite3 [<test name|pattern|tags> ... ] options

where options are:
  -?, -h, --help                            display usage information
  -l, --list-tests                          list all/matching test cases
  -t, --list-tags                           list all/matching tags
  -s, --success                             include successful tests in
                                            output
  -b, --break                               break into debugger on failure
  -e, --nothrow                             skip exception tests
  -i, --invisibles                          show invisibles (tabs, newlines)
  -o, --out <filename>                      output filename
  -r, --reporter <name>                     reporter to use (defaults to
                                            console)
  -n, --name <name>                         suite name
  -a, --abort                               abort at first failure
  -x, --abortx <no. failures>               abort after x failures
  -w, --warn <warning name>                 enable warnings
  -d, --durations <yes|no>                  show test durations
  -f, --input-file <filename>               load test names to run from a
                                            file
  -#, --filenames-as-tags                   adds a tag for the filename
  -c, --section <section name>              specify section to run
  -v, --verbosity <quiet|normal|high>       set output verbosity
  --list-test-names-only                    list all/matching test cases
                                            names only
  --list-reporters                          list all reporters
  --order <decl|lex|rand>                   test case order (defaults to
                                            decl)
  --rng-seed <'time'|number>                set a specific seed for random
                                            numbers
  --use-colour <yes|no>                     should output be colourised
  --libidentify                             report name and version according
                                            to libidentify standard
  --wait-for-keypress <start|exit|both>     waits for a keypress before
                                            exiting
  --benchmark-resolution-multiple           multiple of clock resolution to
  <multiplier>                              run benchmarks

For more detailed usage please see the project docs

`
      ],
      [
        ['[.],*', '--verbosity', 'high', '--list-tests', '--use-colour', 'no'],
        `Matching test cases:
  test name,with,colon
    ../vscode-catch2-test-adapter/src/test/suite3.cpp:8
    tag1
   test name with space 
    ../vscode-catch2-test-adapter/src/test/suite3.cpp:14
    (NO DESCRIPTION)
  SECTION tree
    ../vscode-catch2-test-adapter/src/test/suite3.cpp:20
    (NO DESCRIPTION)
  spec ! char
    ../vscode-catch2-test-adapter/src/test/suite3.cpp:36
    (NO DESCRIPTION)
  spec @ char
    ../vscode-catch2-test-adapter/src/test/suite3.cpp:37
    (NO DESCRIPTION)
  spec # char
    ../vscode-catch2-test-adapter/src/test/suite3.cpp:38
    (NO DESCRIPTION)
  spec $ char
    ../vscode-catch2-test-adapter/src/test/suite3.cpp:39
    (NO DESCRIPTION)
  spec % char
    ../vscode-catch2-test-adapter/src/test/suite3.cpp:40
    (NO DESCRIPTION)
  spec ^ char
    ../vscode-catch2-test-adapter/src/test/suite3.cpp:41
    (NO DESCRIPTION)
  spec & char
    ../vscode-catch2-test-adapter/src/test/suite3.cpp:42
    (NO DESCRIPTION)
  spec * char
    ../vscode-catch2-test-adapter/src/test/suite3.cpp:43
    (NO DESCRIPTION)
  spec (a) char
    ../vscode-catch2-test-adapter/src/test/suite3.cpp:44
    (NO DESCRIPTION)
  spec {a} char
    ../vscode-catch2-test-adapter/src/test/suite3.cpp:45
    (NO DESCRIPTION)
  spec [a] char
    ../vscode-catch2-test-adapter/src/test/suite3.cpp:46
    (NO DESCRIPTION)
  spec ; char
    ../vscode-catch2-test-adapter/src/test/suite3.cpp:47
    (NO DESCRIPTION)
  spec ' char
    ../vscode-catch2-test-adapter/src/test/suite3.cpp:48
    (NO DESCRIPTION)
  spec \\ char
    ../vscode-catch2-test-adapter/src/test/suite3.cpp:49
    (NO DESCRIPTION)
  spec , char
    ../vscode-catch2-test-adapter/src/test/suite3.cpp:50
    (NO DESCRIPTION)
  spec . char
    ../vscode-catch2-test-adapter/src/test/suite3.cpp:51
    (NO DESCRIPTION)
  spec / char
    ../vscode-catch2-test-adapter/src/test/suite3.cpp:52
    (NO DESCRIPTION)
  spec < char
    ../vscode-catch2-test-adapter/src/test/suite3.cpp:53
    (NO DESCRIPTION)
  spec > char
    ../vscode-catch2-test-adapter/src/test/suite3.cpp:54
    (NO DESCRIPTION)
  spec ? char
    ../vscode-catch2-test-adapter/src/test/suite3.cpp:55
    (NO DESCRIPTION)
  spec - char
    ../vscode-catch2-test-adapter/src/test/suite3.cpp:56
    (NO DESCRIPTION)
  spec = char
    ../vscode-catch2-test-adapter/src/test/suite3.cpp:57
    (NO DESCRIPTION)
  spec _ char
    ../vscode-catch2-test-adapter/src/test/suite3.cpp:58
    (NO DESCRIPTION)
  spec + char
    ../vscode-catch2-test-adapter/src/test/suite3.cpp:59
    (NO DESCRIPTION)
  spec ~ char
    ../vscode-catch2-test-adapter/src/test/suite3.cpp:60
    (NO DESCRIPTION)
  spec \` char
    ../vscode-catch2-test-adapter/src/test/suite3.cpp:61
    (NO DESCRIPTION)
  spec § char
    ../vscode-catch2-test-adapter/src/test/suite3.cpp:62
    (NO DESCRIPTION)
  spec ± char
    ../vscode-catch2-test-adapter/src/test/suite3.cpp:63
    (NO DESCRIPTION)
  spec " char
    ../vscode-catch2-test-adapter/src/test/suite3.cpp:64
    (NO DESCRIPTION)
  spec | char
    ../vscode-catch2-test-adapter/src/test/suite3.cpp:65
    (NO DESCRIPTION)
34 matching test cases

`
      ],
      [
        ['--reporter', 'xml', '--durations', 'yes'],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Group name="suite3">
    <TestCase name="test name,with,colon" description="tag1" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="8">
      <OverallResult success="true" durationInSeconds="0.000122"/>
    </TestCase>
    <TestCase name="test name with space" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="14">
      <OverallResult success="true" durationInSeconds="3e-05"/>
    </TestCase>
    <TestCase name="SECTION tree" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="20">
      <Section name="1" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="21">
        <Section name="2" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="22">
          <Section name="3" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="23">
            <Section name="4" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="24">
              <Expression success="false" type="REQUIRE" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="24">
                <Original>
                  std::false_type::value
                </Original>
                <Expanded>
                  false
                </Expanded>
              </Expression>
              <OverallResults successes="0" failures="1" expectedFailures="0" durationInSeconds="0.000195"/>
            </Section>
            <OverallResults successes="0" failures="1" expectedFailures="0" durationInSeconds="0.00017"/>
          </Section>
          <OverallResults successes="0" failures="1" expectedFailures="0" durationInSeconds="0.000148"/>
        </Section>
        <OverallResults successes="0" failures="1" expectedFailures="0" durationInSeconds="0.000122"/>
      </Section>
      <Section name="1" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="21">
        <Section name="2" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="22">
          <Section name="3" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="23">
            <OverallResults successes="0" failures="0" expectedFailures="0" durationInSeconds="1e-06"/>
          </Section>
          <OverallResults successes="0" failures="0" expectedFailures="0" durationInSeconds="3.6e-05"/>
        </Section>
        <OverallResults successes="0" failures="0" expectedFailures="0" durationInSeconds="7.4e-05"/>
      </Section>
      <Section name="1" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="21">
        <Section name="2-2" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="27">
          <Section name="3" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="28">
            <Section name="4" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="29">
              <Expression success="false" type="REQUIRE" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="29">
                <Original>
                  std::false_type::value
                </Original>
                <Expanded>
                  false
                </Expanded>
              </Expression>
              <OverallResults successes="0" failures="1" expectedFailures="0" durationInSeconds="0.00012"/>
            </Section>
            <OverallResults successes="0" failures="1" expectedFailures="0" durationInSeconds="0.000102"/>
          </Section>
          <OverallResults successes="0" failures="1" expectedFailures="0" durationInSeconds="8.4e-05"/>
        </Section>
        <OverallResults successes="0" failures="1" expectedFailures="0" durationInSeconds="6.6e-05"/>
      </Section>
      <Section name="1" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="21">
        <Section name="2-2" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="27">
          <Section name="3" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="28">
            <OverallResults successes="0" failures="0" expectedFailures="0" durationInSeconds="1e-06"/>
          </Section>
          <OverallResults successes="0" failures="0" expectedFailures="0" durationInSeconds="3.4e-05"/>
        </Section>
        <OverallResults successes="0" failures="0" expectedFailures="0" durationInSeconds="7.8e-05"/>
      </Section>
      <OverallResult success="false" durationInSeconds="0.00086"/>
    </TestCase>
    <TestCase name="spec ! char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="36">
      <OverallResult success="true" durationInSeconds="2.2e-05"/>
    </TestCase>
    <TestCase name="spec @ char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="37">
      <OverallResult success="true" durationInSeconds="2.2e-05"/>
    </TestCase>
    <TestCase name="spec # char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="38">
      <OverallResult success="true" durationInSeconds="2.2e-05"/>
    </TestCase>
    <TestCase name="spec $ char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="39">
      <OverallResult success="true" durationInSeconds="2.1e-05"/>
    </TestCase>
    <TestCase name="spec % char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="40">
      <OverallResult success="true" durationInSeconds="2.1e-05"/>
    </TestCase>
    <TestCase name="spec ^ char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="41">
      <OverallResult success="true" durationInSeconds="2.2e-05"/>
    </TestCase>
    <TestCase name="spec &amp; char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="42">
      <OverallResult success="true" durationInSeconds="2.2e-05"/>
    </TestCase>
    <TestCase name="spec * char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="43">
      <OverallResult success="true" durationInSeconds="2.1e-05"/>
    </TestCase>
    <TestCase name="spec (a) char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="44">
      <OverallResult success="true" durationInSeconds="2.1e-05"/>
    </TestCase>
    <TestCase name="spec {a} char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="45">
      <OverallResult success="true" durationInSeconds="2.1e-05"/>
    </TestCase>
    <TestCase name="spec [a] char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="46">
      <OverallResult success="true" durationInSeconds="2.1e-05"/>
    </TestCase>
    <TestCase name="spec ; char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="47">
      <OverallResult success="true" durationInSeconds="2.1e-05"/>
    </TestCase>
    <TestCase name="spec ' char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="48">
      <OverallResult success="true" durationInSeconds="2.2e-05"/>
    </TestCase>
    <TestCase name="spec \ char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="49">
      <OverallResult success="true" durationInSeconds="2.1e-05"/>
    </TestCase>
    <TestCase name="spec , char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="50">
      <OverallResult success="true" durationInSeconds="2.1e-05"/>
    </TestCase>
    <TestCase name="spec . char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="51">
      <OverallResult success="true" durationInSeconds="2.1e-05"/>
    </TestCase>
    <TestCase name="spec / char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="52">
      <OverallResult success="true" durationInSeconds="2.2e-05"/>
    </TestCase>
    <TestCase name="spec &lt; char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="53">
      <OverallResult success="true" durationInSeconds="2.2e-05"/>
    </TestCase>
    <TestCase name="spec > char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="54">
      <OverallResult success="true" durationInSeconds="2.1e-05"/>
    </TestCase>
    <TestCase name="spec ? char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="55">
      <OverallResult success="true" durationInSeconds="2.1e-05"/>
    </TestCase>
    <TestCase name="spec - char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="56">
      <OverallResult success="true" durationInSeconds="2.1e-05"/>
    </TestCase>
    <TestCase name="spec = char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="57">
      <OverallResult success="true" durationInSeconds="2.1e-05"/>
    </TestCase>
    <TestCase name="spec _ char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="58">
      <OverallResult success="true" durationInSeconds="2.1e-05"/>
    </TestCase>
    <TestCase name="spec + char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="59">
      <OverallResult success="true" durationInSeconds="2.1e-05"/>
    </TestCase>
    <TestCase name="spec ~ char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="60">
      <OverallResult success="true" durationInSeconds="2.1e-05"/>
    </TestCase>
    <TestCase name="spec \` char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="61">
      <OverallResult success="true" durationInSeconds="2.1e-05"/>
    </TestCase>
    <TestCase name="spec § char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="62">
      <OverallResult success="true" durationInSeconds="3.3e-05"/>
    </TestCase>
    <TestCase name="spec ± char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="63">
      <OverallResult success="true" durationInSeconds="2.2e-05"/>
    </TestCase>
    <TestCase name="spec &quot; char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="64">
      <OverallResult success="true" durationInSeconds="2.2e-05"/>
    </TestCase>
    <TestCase name="spec | char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="65">
      <OverallResult success="true" durationInSeconds="2.1e-05"/>
    </TestCase>
    <OverallResults successes="2" failures="2" expectedFailures="0"/>
  </Group>
  <OverallResults successes="2" failures="2" expectedFailures="0"/>
</Catch>
`
      ],
      [
        ['--reporter', 'xml', '--durations', 'yes', '--rng-seed', '2'],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Randomness seed="2"/>
  <Group name="suite3">
    <TestCase name="test name,with,colon" description="tag1" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="8">
      <OverallResult success="true" durationInSeconds="8.3e-05"/>
    </TestCase>
    <TestCase name="test name with space" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="14">
      <OverallResult success="true" durationInSeconds="3.2e-05"/>
    </TestCase>
    <TestCase name="SECTION tree" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="20">
      <Section name="1" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="21">
        <Section name="2" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="22">
          <Section name="3" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="23">
            <Section name="4" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="24">
              <Expression success="false" type="REQUIRE" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="24">
                <Original>
                  std::false_type::value
                </Original>
                <Expanded>
                  false
                </Expanded>
              </Expression>
              <OverallResults successes="0" failures="1" expectedFailures="0" durationInSeconds="0.000184"/>
            </Section>
            <OverallResults successes="0" failures="1" expectedFailures="0" durationInSeconds="0.00016"/>
          </Section>
          <OverallResults successes="0" failures="1" expectedFailures="0" durationInSeconds="0.000139"/>
        </Section>
        <OverallResults successes="0" failures="1" expectedFailures="0" durationInSeconds="0.000113"/>
      </Section>
      <Section name="1" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="21">
        <Section name="2" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="22">
          <Section name="3" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="23">
            <OverallResults successes="0" failures="0" expectedFailures="0" durationInSeconds="1e-06"/>
          </Section>
          <OverallResults successes="0" failures="0" expectedFailures="0" durationInSeconds="4.2e-05"/>
        </Section>
        <OverallResults successes="0" failures="0" expectedFailures="0" durationInSeconds="8.5e-05"/>
      </Section>
      <Section name="1" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="21">
        <Section name="2-2" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="27">
          <Section name="3" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="28">
            <Section name="4" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="29">
              <Expression success="false" type="REQUIRE" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="29">
                <Original>
                  std::false_type::value
                </Original>
                <Expanded>
                  false
                </Expanded>
              </Expression>
              <OverallResults successes="0" failures="1" expectedFailures="0" durationInSeconds="0.000154"/>
            </Section>
            <OverallResults successes="0" failures="1" expectedFailures="0" durationInSeconds="0.000134"/>
          </Section>
          <OverallResults successes="0" failures="1" expectedFailures="0" durationInSeconds="0.000114"/>
        </Section>
        <OverallResults successes="0" failures="1" expectedFailures="0" durationInSeconds="9.4e-05"/>
      </Section>
      <Section name="1" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="21">
        <Section name="2-2" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="27">
          <Section name="3" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="28">
            <OverallResults successes="0" failures="0" expectedFailures="0" durationInSeconds="1e-06"/>
          </Section>
          <OverallResults successes="0" failures="0" expectedFailures="0" durationInSeconds="3.4e-05"/>
        </Section>
        <OverallResults successes="0" failures="0" expectedFailures="0" durationInSeconds="6.9e-05"/>
      </Section>
      <OverallResult success="false" durationInSeconds="0.000889"/>
    </TestCase>
    <TestCase name="spec ! char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="36">
      <OverallResult success="true" durationInSeconds="2.5e-05"/>
    </TestCase>
    <TestCase name="spec @ char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="37">
      <OverallResult success="true" durationInSeconds="2.5e-05"/>
    </TestCase>
    <TestCase name="spec # char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="38">
      <OverallResult success="true" durationInSeconds="2.5e-05"/>
    </TestCase>
    <TestCase name="spec $ char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="39">
      <OverallResult success="true" durationInSeconds="2.5e-05"/>
    </TestCase>
    <TestCase name="spec % char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="40">
      <OverallResult success="true" durationInSeconds="2.5e-05"/>
    </TestCase>
    <TestCase name="spec ^ char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="41">
      <OverallResult success="true" durationInSeconds="2.5e-05"/>
    </TestCase>
    <TestCase name="spec &amp; char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="42">
      <OverallResult success="true" durationInSeconds="2.5e-05"/>
    </TestCase>
    <TestCase name="spec * char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="43">
      <OverallResult success="true" durationInSeconds="2.5e-05"/>
    </TestCase>
    <TestCase name="spec (a) char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="44">
      <OverallResult success="true" durationInSeconds="2.5e-05"/>
    </TestCase>
    <TestCase name="spec {a} char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="45">
      <OverallResult success="true" durationInSeconds="2.5e-05"/>
    </TestCase>
    <TestCase name="spec [a] char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="46">
      <OverallResult success="true" durationInSeconds="2.5e-05"/>
    </TestCase>
    <TestCase name="spec ; char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="47">
      <OverallResult success="true" durationInSeconds="2.5e-05"/>
    </TestCase>
    <TestCase name="spec ' char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="48">
      <OverallResult success="true" durationInSeconds="2.5e-05"/>
    </TestCase>
    <TestCase name="spec \ char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="49">
      <OverallResult success="true" durationInSeconds="2.5e-05"/>
    </TestCase>
    <TestCase name="spec , char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="50">
      <OverallResult success="true" durationInSeconds="2.7e-05"/>
    </TestCase>
    <TestCase name="spec . char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="51">
      <OverallResult success="true" durationInSeconds="2.5e-05"/>
    </TestCase>
    <TestCase name="spec / char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="52">
      <OverallResult success="true" durationInSeconds="2.5e-05"/>
    </TestCase>
    <TestCase name="spec &lt; char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="53">
      <OverallResult success="true" durationInSeconds="2.5e-05"/>
    </TestCase>
    <TestCase name="spec > char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="54">
      <OverallResult success="true" durationInSeconds="2.5e-05"/>
    </TestCase>
    <TestCase name="spec ? char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="55">
      <OverallResult success="true" durationInSeconds="2.5e-05"/>
    </TestCase>
    <TestCase name="spec - char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="56">
      <OverallResult success="true" durationInSeconds="2.5e-05"/>
    </TestCase>
    <TestCase name="spec = char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="57">
      <OverallResult success="true" durationInSeconds="2.5e-05"/>
    </TestCase>
    <TestCase name="spec _ char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="58">
      <OverallResult success="true" durationInSeconds="2.5e-05"/>
    </TestCase>
    <TestCase name="spec + char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="59">
      <OverallResult success="true" durationInSeconds="2.5e-05"/>
    </TestCase>
    <TestCase name="spec ~ char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="60">
      <OverallResult success="true" durationInSeconds="2.5e-05"/>
    </TestCase>
    <TestCase name="spec \` char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="61">
      <OverallResult success="true" durationInSeconds="2.5e-05"/>
    </TestCase>
    <TestCase name="spec § char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="62">
      <OverallResult success="true" durationInSeconds="2.5e-05"/>
    </TestCase>
    <TestCase name="spec ± char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="63">
      <OverallResult success="true" durationInSeconds="2.5e-05"/>
    </TestCase>
    <TestCase name="spec &quot; char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="64">
      <OverallResult success="true" durationInSeconds="2.5e-05"/>
    </TestCase>
    <TestCase name="spec | char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="65">
      <OverallResult success="true" durationInSeconds="2.5e-05"/>
    </TestCase>
    <OverallResults successes="2" failures="2" expectedFailures="0"/>
  </Group>
  <OverallResults successes="2" failures="2" expectedFailures="0"/>
</Catch>
`
      ],
      [
        ['test name\\,with\\,colon', '--reporter', 'xml', '--durations', 'yes'],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Group name="suite3">
    <TestCase name="test name,with,colon" description="tag1" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="8">
      <OverallResult success="true" durationInSeconds="8e-05"/>
    </TestCase>
    <OverallResults successes="1" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="1" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        ['*test name with space ', '--reporter', 'xml', '--durations', 'yes'],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Group name="suite3">
    <TestCase name="test name with space" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="14">
      <OverallResult success="true" durationInSeconds="7.7e-05"/>
    </TestCase>
    <OverallResults successes="1" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="1" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        ['SECTION tree', '--reporter', 'xml', '--durations', 'yes'],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Group name="suite3">
    <TestCase name="SECTION tree" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="20">
      <Section name="1" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="21">
        <Section name="2" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="22">
          <Section name="3" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="23">
            <Section name="4" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="24">
              <Expression success="false" type="REQUIRE" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="24">
                <Original>
                  std::false_type::value
                </Original>
                <Expanded>
                  false
                </Expanded>
              </Expression>
              <OverallResults successes="0" failures="1" expectedFailures="0" durationInSeconds="0.000209"/>
            </Section>
            <OverallResults successes="0" failures="1" expectedFailures="0" durationInSeconds="0.000183"/>
          </Section>
          <OverallResults successes="0" failures="1" expectedFailures="0" durationInSeconds="0.000159"/>
        </Section>
        <OverallResults successes="0" failures="1" expectedFailures="0" durationInSeconds="0.000129"/>
      </Section>
      <Section name="1" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="21">
        <Section name="2" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="22">
          <Section name="3" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="23">
            <OverallResults successes="0" failures="0" expectedFailures="0" durationInSeconds="1e-06"/>
          </Section>
          <OverallResults successes="0" failures="0" expectedFailures="0" durationInSeconds="4.5e-05"/>
        </Section>
        <OverallResults successes="0" failures="0" expectedFailures="0" durationInSeconds="9.4e-05"/>
      </Section>
      <Section name="1" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="21">
        <Section name="2-2" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="27">
          <Section name="3" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="28">
            <Section name="4" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="29">
              <Expression success="false" type="REQUIRE" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="29">
                <Original>
                  std::false_type::value
                </Original>
                <Expanded>
                  false
                </Expanded>
              </Expression>
              <OverallResults successes="0" failures="1" expectedFailures="0" durationInSeconds="0.000144"/>
            </Section>
            <OverallResults successes="0" failures="1" expectedFailures="0" durationInSeconds="0.000124"/>
          </Section>
          <OverallResults successes="0" failures="1" expectedFailures="0" durationInSeconds="0.000104"/>
        </Section>
        <OverallResults successes="0" failures="1" expectedFailures="0" durationInSeconds="8.4e-05"/>
      </Section>
      <Section name="1" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="21">
        <Section name="2-2" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="27">
          <Section name="3" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="28">
            <OverallResults successes="0" failures="0" expectedFailures="0" durationInSeconds="1e-06"/>
          </Section>
          <OverallResults successes="0" failures="0" expectedFailures="0" durationInSeconds="4.1e-05"/>
        </Section>
        <OverallResults successes="0" failures="0" expectedFailures="0" durationInSeconds="8.3e-05"/>
      </Section>
      <OverallResult success="false" durationInSeconds="0.001147"/>
    </TestCase>
    <OverallResults successes="0" failures="2" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="2" expectedFailures="0"/>
</Catch>
`
      ],
      [
        ['spec ! char', '--reporter', 'xml', '--durations', 'yes'],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Group name="suite3">
    <TestCase name="spec ! char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="36">
      <OverallResult success="true" durationInSeconds="7.3e-05"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        ['spec @ char', '--reporter', 'xml', '--durations', 'yes'],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Group name="suite3">
    <TestCase name="spec @ char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="37">
      <OverallResult success="true" durationInSeconds="8.5e-05"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        ['spec # char', '--reporter', 'xml', '--durations', 'yes'],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Group name="suite3">
    <TestCase name="spec # char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="38">
      <OverallResult success="true" durationInSeconds="7.4e-05"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        ['spec $ char', '--reporter', 'xml', '--durations', 'yes'],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Group name="suite3">
    <TestCase name="spec $ char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="39">
      <OverallResult success="true" durationInSeconds="7.4e-05"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        ['spec % char', '--reporter', 'xml', '--durations', 'yes'],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Group name="suite3">
    <TestCase name="spec % char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="40">
      <OverallResult success="true" durationInSeconds="7.4e-05"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        ['spec ^ char', '--reporter', 'xml', '--durations', 'yes'],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Group name="suite3">
    <TestCase name="spec ^ char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="41">
      <OverallResult success="true" durationInSeconds="7.6e-05"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        ['spec & char', '--reporter', 'xml', '--durations', 'yes'],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Group name="suite3">
    <TestCase name="spec &amp; char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="42">
      <OverallResult success="true" durationInSeconds="7.3e-05"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        ['spec \\* char', '--reporter', 'xml', '--durations', 'yes'],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Group name="suite3">
    <TestCase name="spec * char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="43">
      <OverallResult success="true" durationInSeconds="7.5e-05"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        ['spec \(a\) char', '--reporter', 'xml', '--durations', 'yes'],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Group name="suite3">
    <TestCase name="spec (a) char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="44">
      <OverallResult success="true" durationInSeconds="7.6e-05"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        ['spec {a} char', '--reporter', 'xml', '--durations', 'yes'],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Group name="suite3">
    <TestCase name="spec {a} char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="45">
      <OverallResult success="true" durationInSeconds="0.000136"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        ['spec \\[a] char', '--reporter', 'xml', '--durations', 'yes'],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Group name="suite3">
    <TestCase name="spec [a] char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="46">
      <OverallResult success="true" durationInSeconds="7.4e-05"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        ['spec ; char', '--reporter', 'xml', '--durations', 'yes'],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Group name="suite3">
    <TestCase name="spec ; char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="47">
      <OverallResult success="true" durationInSeconds="9.5e-05"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        ['spec \' char', '--reporter', 'xml', '--durations', 'yes'],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Group name="suite3">
    <TestCase name="spec ' char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="48">
      <OverallResult success="true" durationInSeconds="7.8e-05"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        ['spec \\ char', '--reporter', 'xml', '--durations', 'yes'],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Group name="suite3">
    <TestCase name="spec \\ char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="49">
      <OverallResult success="true" durationInSeconds="7.3e-05"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        ['spec \\, char', '--reporter', 'xml', '--durations', 'yes'],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Group name="suite3">
    <TestCase name="spec , char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="50">
      <OverallResult success="true" durationInSeconds="7.4e-05"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        ['spec . char', '--reporter', 'xml', '--durations', 'yes'],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Group name="suite3">
    <TestCase name="spec . char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="51">
      <OverallResult success="true" durationInSeconds="7.3e-05"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        ['spec / char', '--reporter', 'xml', '--durations', 'yes'],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Group name="suite3">
    <TestCase name="spec / char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="52">
      <OverallResult success="true" durationInSeconds="7.4e-05"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        ['spec < char', '--reporter', 'xml', '--durations', 'yes'],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Group name="suite3">
    <TestCase name="spec &lt; char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="53">
      <OverallResult success="true" durationInSeconds="7.1e-05"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        ['spec > char', '--reporter', 'xml', '--durations', 'yes'],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Group name="suite3">
    <TestCase name="spec > char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="54">
      <OverallResult success="true" durationInSeconds="7.3e-05"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        ['spec ? char', '--reporter', 'xml', '--durations', 'yes'],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Group name="suite3">
    <TestCase name="spec ? char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="55">
      <OverallResult success="true" durationInSeconds="7.2e-05"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        ['spec - char', '--reporter', 'xml', '--durations', 'yes'],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Group name="suite3">
    <TestCase name="spec - char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="56">
      <OverallResult success="true" durationInSeconds="7.3e-05"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        ['spec = char', '--reporter', 'xml', '--durations', 'yes'],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Group name="suite3">
    <TestCase name="spec = char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="57">
      <OverallResult success="true" durationInSeconds="7.3e-05"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        ['spec _ char', '--reporter', 'xml', '--durations', 'yes'],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Group name="suite3">
    <TestCase name="spec _ char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="58">
      <OverallResult success="true" durationInSeconds="7.3e-05"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        ['spec + char', '--reporter', 'xml', '--durations', 'yes'],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Group name="suite3">
    <TestCase name="spec + char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="59">
      <OverallResult success="true" durationInSeconds="0.000145"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        ['spec ~ char', '--reporter', 'xml', '--durations', 'yes'],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Group name="suite3">
    <TestCase name="spec ~ char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="60">
      <OverallResult success="true" durationInSeconds="0.000148"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        ['spec \` char', '--reporter', 'xml', '--durations', 'yes'],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Group name="suite3">
    <TestCase name="spec \` char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="61">
      <OverallResult success="true" durationInSeconds="0.000134"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        ['spec § char', '--reporter', 'xml', '--durations', 'yes'],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Group name="suite3">
    <TestCase name="spec § char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="62">
      <OverallResult success="true" durationInSeconds="7.6e-05"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        ['spec ± char', '--reporter', 'xml', '--durations', 'yes'],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Group name="suite3">
    <TestCase name="spec ± char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="63">
      <OverallResult success="true" durationInSeconds="7.4e-05"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        ['spec " char', '--reporter', 'xml', '--durations', 'yes'],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Group name="suite3">
    <TestCase name="spec &quot; char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="64">
      <OverallResult success="true" durationInSeconds="7.5e-05"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        ['spec | char', '--reporter', 'xml', '--durations', 'yes'],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Group name="suite3">
    <TestCase name="spec | char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="65">
      <OverallResult success="true" durationInSeconds="7.4e-05"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        [
          'test name\,with\,colon', '--reporter', 'xml', '--durations', 'yes',
          '--rng-seed', '2'
        ],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Randomness seed="2"/>
  <Group name="suite3">
    <TestCase name="test name,with,colon" description="tag1" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="8">
      <OverallResult success="true" durationInSeconds="9.8e-05"/>
    </TestCase>
    <OverallResults successes="1" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="1" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        [
          '*test name with space ', '--reporter', 'xml', '--durations', 'yes',
          '--rng-seed', '2'
        ],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Randomness seed="2"/>
  <Group name="suite3">
    <TestCase name="test name with space" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="14">
      <OverallResult success="true" durationInSeconds="8.1e-05"/>
    </TestCase>
    <OverallResults successes="1" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="1" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        [
          'SECTION tree', '--reporter', 'xml', '--durations', 'yes',
          '--rng-seed', '2'
        ],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Randomness seed="2"/>
  <Group name="suite3">
    <TestCase name="SECTION tree" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="20">
      <Section name="1" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="21">
        <Section name="2" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="22">
          <Section name="3" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="23">
            <Section name="4" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="24">
              <Expression success="false" type="REQUIRE" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="24">
                <Original>
                  std::false_type::value
                </Original>
                <Expanded>
                  false
                </Expanded>
              </Expression>
              <OverallResults successes="0" failures="1" expectedFailures="0" durationInSeconds="0.000193"/>
            </Section>
            <OverallResults successes="0" failures="1" expectedFailures="0" durationInSeconds="0.000169"/>
          </Section>
          <OverallResults successes="0" failures="1" expectedFailures="0" durationInSeconds="0.000148"/>
        </Section>
        <OverallResults successes="0" failures="1" expectedFailures="0" durationInSeconds="0.00012"/>
      </Section>
      <Section name="1" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="21">
        <Section name="2" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="22">
          <Section name="3" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="23">
            <OverallResults successes="0" failures="0" expectedFailures="0" durationInSeconds="1e-06"/>
          </Section>
          <OverallResults successes="0" failures="0" expectedFailures="0" durationInSeconds="4.2e-05"/>
        </Section>
        <OverallResults successes="0" failures="0" expectedFailures="0" durationInSeconds="8.6e-05"/>
      </Section>
      <Section name="1" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="21">
        <Section name="2-2" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="27">
          <Section name="3" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="28">
            <Section name="4" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="29">
              <Expression success="false" type="REQUIRE" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="29">
                <Original>
                  std::false_type::value
                </Original>
                <Expanded>
                  false
                </Expanded>
              </Expression>
              <OverallResults successes="0" failures="1" expectedFailures="0" durationInSeconds="0.000144"/>
            </Section>
            <OverallResults successes="0" failures="1" expectedFailures="0" durationInSeconds="0.000124"/>
          </Section>
          <OverallResults successes="0" failures="1" expectedFailures="0" durationInSeconds="0.000104"/>
        </Section>
        <OverallResults successes="0" failures="1" expectedFailures="0" durationInSeconds="8.4e-05"/>
      </Section>
      <Section name="1" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="21">
        <Section name="2-2" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="27">
          <Section name="3" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="28">
            <OverallResults successes="0" failures="0" expectedFailures="0" durationInSeconds="1e-06"/>
          </Section>
          <OverallResults successes="0" failures="0" expectedFailures="0" durationInSeconds="4.1e-05"/>
        </Section>
        <OverallResults successes="0" failures="0" expectedFailures="0" durationInSeconds="8.3e-05"/>
      </Section>
      <OverallResult success="false" durationInSeconds="0.000986"/>
    </TestCase>
    <OverallResults successes="0" failures="2" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="2" expectedFailures="0"/>
</Catch>
`
      ],
      [
        [
          'spec ! char', '--reporter', 'xml', '--durations', 'yes',
          '--rng-seed', '2'
        ],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Randomness seed="2"/>
  <Group name="suite3">
    <TestCase name="spec ! char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="36">
      <OverallResult success="true" durationInSeconds="7.7e-05"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        [
          'spec @ char', '--reporter', 'xml', '--durations', 'yes',
          '--rng-seed', '2'
        ],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Randomness seed="2"/>
  <Group name="suite3">
    <TestCase name="spec @ char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="37">
      <OverallResult success="true" durationInSeconds="7.6e-05"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        [
          'spec # char', '--reporter', 'xml', '--durations', 'yes',
          '--rng-seed', '2'
        ],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Randomness seed="2"/>
  <Group name="suite3">
    <TestCase name="spec # char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="38">
      <OverallResult success="true" durationInSeconds="7.8e-05"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        [
          'spec $ char', '--reporter', 'xml', '--durations', 'yes',
          '--rng-seed', '2'
        ],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Randomness seed="2"/>
  <Group name="suite3">
    <TestCase name="spec $ char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="39">
      <OverallResult success="true" durationInSeconds="7.8e-05"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        [
          'spec % char', '--reporter', 'xml', '--durations', 'yes',
          '--rng-seed', '2'
        ],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Randomness seed="2"/>
  <Group name="suite3">
    <TestCase name="spec % char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="40">
      <OverallResult success="true" durationInSeconds="8.9e-05"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        [
          'spec ^ char', '--reporter', 'xml', '--durations', 'yes',
          '--rng-seed', '2'
        ],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Randomness seed="2"/>
  <Group name="suite3">
    <TestCase name="spec ^ char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="41">
      <OverallResult success="true" durationInSeconds="7.6e-05"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        [
          'spec & char', '--reporter', 'xml', '--durations', 'yes',
          '--rng-seed', '2'
        ],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Randomness seed="2"/>
  <Group name="suite3">
    <TestCase name="spec &amp; char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="42">
      <OverallResult success="true" durationInSeconds="8.3e-05"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        [
          'spec \\* char', '--reporter', 'xml', '--durations', 'yes',
          '--rng-seed', '2'
        ],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Randomness seed="2"/>
  <Group name="suite3">
    <TestCase name="spec * char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="43">
      <OverallResult success="true" durationInSeconds="7.4e-05"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        [
          'spec \(a\) char', '--reporter', 'xml', '--durations', 'yes',
          '--rng-seed', '2'
        ],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Randomness seed="2"/>
  <Group name="suite3">
    <TestCase name="spec (a) char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="44">
      <OverallResult success="true" durationInSeconds="8.3e-05"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        [
          'spec {a} char', '--reporter', 'xml', '--durations', 'yes',
          '--rng-seed', '2'
        ],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Randomness seed="2"/>
  <Group name="suite3">
    <TestCase name="spec {a} char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="45">
      <OverallResult success="true" durationInSeconds="7.6e-05"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        [
          'spec \\[a] char', '--reporter', 'xml', '--durations', 'yes',
          '--rng-seed', '2'
        ],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Randomness seed="2"/>
  <Group name="suite3">
    <TestCase name="spec [a] char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="46">
      <OverallResult success="true" durationInSeconds="8.3e-05"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        [
          'spec ; char', '--reporter', 'xml', '--durations', 'yes',
          '--rng-seed', '2'
        ],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Randomness seed="2"/>
  <Group name="suite3">
    <TestCase name="spec ; char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="47">
      <OverallResult success="true" durationInSeconds="7.6e-05"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        [
          'spec \' char', '--reporter', 'xml', '--durations', 'yes',
          '--rng-seed', '2'
        ],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Randomness seed="2"/>
  <Group name="suite3">
    <TestCase name="spec ' char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="48">
      <OverallResult success="true" durationInSeconds="8.8e-05"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        [
          'spec \\\\ char', '--reporter', 'xml', '--durations', 'yes',
          '--rng-seed', '2'
        ],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Randomness seed="2"/>
  <Group name="suite3">
    <TestCase name="spec \ char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="49">
      <OverallResult success="true" durationInSeconds="7.5e-05"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        [
          'spec \\, char', '--reporter', 'xml', '--durations', 'yes',
          '--rng-seed', '2'
        ],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Randomness seed="2"/>
  <Group name="suite3">
    <TestCase name="spec , char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="50">
      <OverallResult success="true" durationInSeconds="8.1e-05"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        [
          'spec . char', '--reporter', 'xml', '--durations', 'yes',
          '--rng-seed', '2'
        ],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Randomness seed="2"/>
  <Group name="suite3">
    <TestCase name="spec . char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="51">
      <OverallResult success="true" durationInSeconds="7.6e-05"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        [
          'spec / char', '--reporter', 'xml', '--durations', 'yes',
          '--rng-seed', '2'
        ],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Randomness seed="2"/>
  <Group name="suite3">
    <TestCase name="spec / char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="52">
      <OverallResult success="true" durationInSeconds="9.3e-05"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        [
          'spec < char', '--reporter', 'xml', '--durations', 'yes',
          '--rng-seed', '2'
        ],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Randomness seed="2"/>
  <Group name="suite3">
    <TestCase name="spec &lt; char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="53">
      <OverallResult success="true" durationInSeconds="7.5e-05"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        [
          'spec > char', '--reporter', 'xml', '--durations', 'yes',
          '--rng-seed', '2'
        ],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Randomness seed="2"/>
  <Group name="suite3">
    <TestCase name="spec > char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="54">
      <OverallResult success="true" durationInSeconds="0.000117"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        [
          'spec ? char', '--reporter', 'xml', '--durations', 'yes',
          '--rng-seed', '2'
        ],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Randomness seed="2"/>
  <Group name="suite3">
    <TestCase name="spec ? char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="55">
      <OverallResult success="true" durationInSeconds="7.8e-05"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        [
          'spec - char', '--reporter', 'xml', '--durations', 'yes',
          '--rng-seed', '2'
        ],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Randomness seed="2"/>
  <Group name="suite3">
    <TestCase name="spec - char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="56">
      <OverallResult success="true" durationInSeconds="7.7e-05"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        [
          'spec = char', '--reporter', 'xml', '--durations', 'yes',
          '--rng-seed', '2'
        ],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Randomness seed="2"/>
  <Group name="suite3">
    <TestCase name="spec = char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="57">
      <OverallResult success="true" durationInSeconds="7.5e-05"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        [
          'spec _ char', '--reporter', 'xml', '--durations', 'yes',
          '--rng-seed', '2'
        ],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Randomness seed="2"/>
  <Group name="suite3">
    <TestCase name="spec _ char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="58">
      <OverallResult success="true" durationInSeconds="7.6e-05"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        [
          'spec + char', '--reporter', 'xml', '--durations', 'yes',
          '--rng-seed', '2'
        ],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Randomness seed="2"/>
  <Group name="suite3">
    <TestCase name="spec + char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="59">
      <OverallResult success="true" durationInSeconds="7.5e-05"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        [
          'spec ~ char', '--reporter', 'xml', '--durations', 'yes',
          '--rng-seed', '2'
        ],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Randomness seed="2"/>
  <Group name="suite3">
    <TestCase name="spec ~ char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="60">
      <OverallResult success="true" durationInSeconds="8.7e-05"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        [
          'spec \` char', '--reporter', 'xml', '--durations', 'yes',
          '--rng-seed', '2'
        ],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Randomness seed="2"/>
  <Group name="suite3">
    <TestCase name="spec \` char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="61">
      <OverallResult success="true" durationInSeconds="7.8e-05"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        [
          'spec § char', '--reporter', 'xml', '--durations', 'yes',
          '--rng-seed', '2'
        ],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Randomness seed="2"/>
  <Group name="suite3">
    <TestCase name="spec § char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="62">
      <OverallResult success="true" durationInSeconds="0.000132"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        [
          'spec ± char', '--reporter', 'xml', '--durations', 'yes',
          '--rng-seed', '2'
        ],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Randomness seed="2"/>
  <Group name="suite3">
    <TestCase name="spec ± char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="63">
      <OverallResult success="true" durationInSeconds="9.2e-05"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        [
          'spec " char', '--reporter', 'xml', '--durations', 'yes',
          '--rng-seed', '2'
        ],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Randomness seed="2"/>
  <Group name="suite3">
    <TestCase name="spec &quot; char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="64">
      <OverallResult success="true" durationInSeconds="8e-05"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],
      [
        [
          'spec | char', '--reporter', 'xml', '--durations', 'yes',
          '--rng-seed', '2'
        ],
        `<?xml version="1.0" encoding="UTF-8"?>
<Catch name="suite3">
  <Randomness seed="2"/>
  <Group name="suite3">
    <TestCase name="spec | char" filename="../vscode-catch2-test-adapter/src/test/suite3.cpp" line="65">
      <OverallResult success="true" durationInSeconds="7.6e-05"/>
    </TestCase>
    <OverallResults successes="0" failures="0" expectedFailures="0"/>
  </Group>
  <OverallResults successes="0" failures="0" expectedFailures="0"/>
</Catch>
`
      ],

    ];
  };

  assertWithoutChildren(root: TestSuiteInfo, uniqeIdContainer?: Set<string>) {
    assert.equal(root.type, 'suite');
    assert.ok(root.label.endsWith(' - Catch2'), root.label);
    assert.equal(root.file, undefined);
    assert.equal(root.line, undefined);
    if (uniqeIdContainer != undefined) {
      assert.ok(!uniqeIdContainer.has(root.id));
      uniqeIdContainer.add(root.id);
    }
  };

  readonly outputs: [string, [string[], string][]][] = [
    [this.suite1.execPath, this.suite1.outputs],
    [this.suite2.execPath, this.suite2.outputs],
    [this.suite3.execPath, this.suite3.outputs],
  ];
};