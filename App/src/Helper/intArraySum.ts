const intArraySum = (array: number[]) => {
    return array.length > 0
        ? array.reduce((a: number, b: number) => {
              return a + b;
          })
        : 0;
};

export default intArraySum;
