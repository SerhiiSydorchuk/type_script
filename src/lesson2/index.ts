// class user {
//     constructor(private _name:string){}
//     get name():string{
//         return this._name
//     }
//     set name(newname:string){
//         this._name=newname
//     }
// }
//
//
// const user = new user('max');
// console.log(user.name);
// user.name='olga'
// console.log(user.name);

// створюємо форму в яку вкладаємо нашого user
interface IUserForm {
    name:string
    age:number
}
// створюємо інтерфейс юзера (extends наслідування всіх параметрів)
interface IUser extends IUserForm{
  id:number
}
//створюємо сервіс який буде виводити нашу інформацію в div- usercontainer
class UserService {
    //readonly - типу як константа яку не можна змінювати
    //static - не створюючи єкземпляр класу можна достукатись до його полів напр: userservice._userkey
    private static readonly _userKey='user'
    //Створюємо функцію для додавання в localStorage
    private static _setToStorage(data:IUser[]):void{
        localStorage.setItem(this._userKey, JSON.stringify(data))
   }
    // Створюємо метод по додаванню наших користувачів
     static create(data:IUserForm):void{
         const users = this._getAll();
        const id= users.length?users.slice(-1)[0].id+1:1
         users.push({id, ...data})
         this._setToStorage(users)
     }
    // виводимо всіх юзерів з localstorage
    private static _getAll ():IUser[]{
          return JSON.parse(localStorage.getItem(this._userKey))||[
              {id:1,name:'max',age:15}
          ]
    }
    //створюємо статичний медод щоб вивести всіх користувачів
    static showHtml():void{
        const userContainer = document.querySelector('#userContainer') as HTMLDivElement;
        //innerhtml видаляємо все що там є
        userContainer.innerHTML=' '
        //отримую всіх своїх користувачів`
        const users = this._getAll();
        // ітеруємо всіх юзерів і на кожній ітерації отримуємо юзера котрий має div and button
        const usersHtml = users.map(user => {
            const itemDiv = document.createElement('div');
            const userBtn = document.createElement('button');
            userBtn.innerText = 'delete'
            userBtn.onclick = () => {
                this._deleteById(user.id);
            }
            itemDiv.innerText = `${user.id} -- ${user.name} -- ${user.age}`;
            itemDiv.appendChild(userBtn);
            // повертаємо масив юзерів
            return itemDiv
        });
        if(usersHtml.length){
            userContainer.append(...usersHtml);
        }else{userContainer.innerText= 'users does not exists'}
    }
//створюємо метод для видалення юзера
    private static _deleteById(id:number):void{
        //беремо всіх наших юзерів
        const users = this._getAll();
        //знаходимо id юзера
        const index = users.findIndex(user => user.id === id);
        users.splice(index, 1);
        this._setToStorage(users);
        this.showHtml()

    }
}

UserService.showHtml()

const form= document.forms['userForm'] as HTMLFormElement
interface IInput{
    name: HTMLInputElement;
    age: HTMLInputElement;
}
form.onsubmit=(e:SubmitEvent):void=>{
    e.preventDefault()
    const {name:nameInput, age:ageInput} = form as any as IInput;
    UserService.create({name:nameInput.value, age:+ageInput.value})
    form.reset()
    UserService.showHtml()
}

