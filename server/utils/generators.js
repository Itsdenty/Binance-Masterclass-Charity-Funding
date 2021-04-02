class generators {
  static generateCartId() {
    let init = +new Date();
    init += '';
    const transform = {
      1: 'D', 2: 'F', 3: 'E', 4: 'K', 5: 'A', 6: 'J', 7: 'O', 8: 'P', 9: 'W', 0: 'Z',
    };
    let pref = '';
    const initArr = init.split('');
    initArr.forEach((int) => {
      pref += transform[int];
    });
    return `SC-${pref}`;
  }
}

export default generators;
