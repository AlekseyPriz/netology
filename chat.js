const EventEmitter = require('events');

class ChatApp extends EventEmitter {
  /**
   * @param {String} title
   */
  constructor(title) {
    super();

    this.title = title;

    // Посылать каждую секунду сообщение
    setInterval(() => {
      this.emit('message', `${this.title}: ping-pong`);
  }, 1000);
  }

  // Добавлем методы
  close(){
    this.emit('close');
  }
}

let webinarChat =  new ChatApp('webinar');
let facebookChat = new ChatApp('=========facebook');
let vkChat =       new ChatApp('---------vk').setMaxListeners(3);


let chatOnMessage = (message) => {
  console.log(message);
};

let prepareTheAnswer = (message) => {
  console.log('Готовлюсь к ответу');
}

let closeVK = () => {
  console.log('Чат вконтакте закрылся :(');
}

webinarChat.on('message', chatOnMessage);
webinarChat.on('message', prepareTheAnswer);
facebookChat.on('message', chatOnMessage);
vkChat.on('message', chatOnMessage);
vkChat.on('message', prepareTheAnswer);
vkChat.on('close', closeVK);


// Закрыть вконтакте
setTimeout( ()=> {
  console.log('Закрываю вконтакте...');
  vkChat.close();
  vkChat.removeListener('message', chatOnMessage);
  vkChat.removeListener('message', prepareTheAnswer);
  vkChat.removeListener('close', closeVK);
}, 10000 );


// Закрыть фейсбук
setTimeout( ()=> {
  console.log('Закрываю фейсбук, все внимание — вебинару!');
  facebookChat.removeListener('message', chatOnMessage);
}, 15000 );

// Закрыть ВебинарЧат
setTimeout( () => {
  webinarChat.removeListener('message', chatOnMessage);
  webinarChat.removeListener('message', prepareTheAnswer);
}, 30000)