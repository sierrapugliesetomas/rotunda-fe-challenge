class Animal {
  constructor(sound) {
    this.sound = sound;
  }

  speak(string) {
    let length = string.split(' ').length;
    let specialCharsRegex =  new RegExp('/,|!/?/');

    return string
    .split(' ')
    .map((str, index) => {
      let mappedStr = str;
      if (index < length - 1 || specialCharsRegex.test(str)) {
      	mappedStr = str.concat(` ${this.sound}`);
      }
      return mappedStr;
    })
	  .join(" ");
  }
}

class Lion extends Animal {
  constructor() {
      super('roar');
  }
}

class Tiger extends Animal {
  constructor() {
      super('grrr');
  }
}