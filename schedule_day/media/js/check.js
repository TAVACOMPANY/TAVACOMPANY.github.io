
// простенький класс, для упрощения сохранения 
// и чтения массивов объектов в localStorage
class Stogage {
    constructor(name){
      // конструктор. создает в localStorage 
      // именованное хранилище

      // запоминаем название именованного хранилища
      this.name = name;

      // создаем ассоциативный массив в котором для
      // быстрого доступа будут кэшироваться объекты
      // сохраняемые в именованном хранилище
      this.hash = {};
      
      // если в localStorage уже есть данные 
      // сохраненые под ключем с именем this.name
      // то считываем их в this.hash
      let text = localStorage.getItem(this.name);
      if(text)
        this.hash = JSON.parse(text);
      
      // сохраняем ассоциативный массив this.hash в
      // localStorage под именем this.name 
      this.save();  
    }
  
    get(id){
      // получить значение по его id из именованного хранилища 
      // с именем this.name
      return this.item.find(item=>item.id===id)
    }
  
    add(id, data){
      // сохранить значение по его id в именованном хранилище
      // с именем this.name
      this.hash[id] = data;
      this.save();
    }
  
    del(id){
      // удалить значение по его id в именованном хранилище
      // с именем this.name
      delete this.hash[id];
      this.save();
    }

    save(){
      // преобразуем ассоциативный массив this.hash в массив list
      this.list = Object.values(this.hash);
      
      // преобразуем массив list в строку text
      const text = JSON.stringify(this.hash);
      
      // сохраняем строку text в localStorage под
      // именем this.name
      localStorage.setItem(this.name, text);      
    }
    
}




// создаем объект класса Stogage для хранения данных о состоянии checkbox-в в localStorage
const checkbox_store = new Stogage('checkbox_store');


// восстанавливает состояния checkbox-в сохраненные в localstorage checkbox_store
checkbox_store.list.forEach(item=>{
  // если есть такой элемент, выставляем ему запомненное состояние
  if( item.state === "on" )
     return $('#' + item.id).prop('checked', item.state);
  checkbox_store.del(item.id);
});


// устанавливаем обработчик для фиксации изменения состояния checkbox-в с классом check
$('body').on('change', '.check', function(event){
  let id = $(this).attr('id');
  let state = event.currentTarget.checked?"on":undefined;
  checkbox_store.add(id, {
    id: id,
    state: state
  });
});
