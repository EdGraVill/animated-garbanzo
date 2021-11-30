import { arrayToBinTreeNode, InputArray, BinTreeNode } from '../arrayToBinTreeNode';

describe('arrayToBinTreeNode function', () => {
  it('Should work with an array givin only an id', () => {
    const input: InputArray = [1];
    const expectedOutput: BinTreeNode = { id: 1 };

    const result = arrayToBinTreeNode(input);

    expect(result).toEqual(expectedOutput);
  });

  it('Should create a one level tree', () => {
    const input: InputArray = [1, [2], [3]];
    const expectedOutput: BinTreeNode = { id: 1, left: { id: 2 }, right: { id: 3 } };

    const result = arrayToBinTreeNode(input);

    expect(result).toEqual(expectedOutput);
  });

  it('Should return null node if not gived a valid array', () => {
    // @ts-expect-error
    const input: InputArray = [1, [2], 3];
    const expectedOutput: BinTreeNode = { id: 1, left: { id: 2 }, right: null };

    const result = arrayToBinTreeNode(input);

    expect(result).toEqual(expectedOutput);
  });

  it('Should return null if cant resolve the input', () => {
    // @ts-expect-error
    const input: InputArray = '[1, [2], [3]]';
    // @ts-expect-error
    const expectedOutput: BinTreeNode = null;

    const result = arrayToBinTreeNode(input);

    expect(result).toEqual(expectedOutput);
  });

  it('Should process a long array and respect id type', () => {
    const input: InputArray = [
      1,
      ['2',
        ['3',
          [4,
            ['5',
              [6,
                ['7',
                  null,
                  [8],
                ],
                [9,
                  [10],
                ],
              ],
              ['11'],
            ],
            [12],
          ],
          ['13'],
        ],
        [14,
          [15],
          [16],
        ],
      ],
      ['17'],
    ];
    const expectedOutput: BinTreeNode = {
      id: 1,
      left: {
        id: '2',
        left: {
          id: '3',
          left: {
            id: 4,
            left: {
              id: '5',
              left: {
                id: 6,
                left: {
                  id: '7',
                  left: null,
                  right: {
                    id: 8,
                  },
                },
                right: {
                  id: 9,
                  left: {
                    id: 10,
                  },
                },
              },
              right: {
                id: '11',
              },
            },
            right: {
              id: 12,
            },
          },
          right: {
            id: '13',
          },
        },
        right: {
          id: 14,
          left: {
            id: 15,
          },
          right: {
            id: 16,
          },
        },
      },
      right: {
        id: '17',
      },
    };

    const result = arrayToBinTreeNode(input);

    expect(result).toEqual(expectedOutput);
  });
});
