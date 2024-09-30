// const asd = (name:string[], flat:number):number[]=>{
//     console.log(name[0]);
//     return [1,2,3]
// }
// asd(['max','kokos'],36)
// asd(['max','kokos'],36)
// asd(['max','kokos'],36)
// asd(['max','kokos'],36)
// interface IUser<T> {
//     name:string,
//     age?:number,// поле є необовязковим
//     house:number,
//     data: T
// }
//
// // const user:IUser = {name:'max',house:25}
// const user: IUser<string> = {name: 'kokos', house: 25, age: 35, data: '542'};
// console.log(user);
// const user1: IUser<number> = {name: 'kokos', house: 25, age: 35, data: 542};
// console.log(user1);


class User {
//     name:string;
//     age:number;
//     house:number
// status:boolean;
    //Замість цього можемо прописати модифікатори доступу
    //public - повний доступ
    //private - є доступ в середині конструктору
    //protected


    constructor(private _name: string,private age: number,private house: number,public status: boolean) {
        // this.name = name;
        // this.age = age;
        // this.house = house;
        // this.status = status;
    }
    getName():string{
        return this._name
    }
    setName(name:string):void{
        this._name=name
    }
}
const user = new User('serhii',30,1,true)
user.setName('max');
console.log(user.getName());
const users:User[]=[
    new User('asd',1,1,true),
    new User('asd',1,1,true),
    new User('asd',1,1,true),
    new User('asd',1,1,true),
    new User('asd',1,1,true)

]
abstract class Shape {
    abstract perimetr():number

    abstract area():number
}
// const  shape = new Shape
interface ITools {
    greeting():void
}interface ITools2 {
    count():void
}

class Rectangle extends Shape implements ITools,ITools2{

    constructor(private a:number,private b:number) {
        super();
    }

    count(): void {
        console.log(125);
    }

    greeting(): void {
        console.log('Hello');
    }
    perimetr(): number {
        return (this.a+this.b)*2;
    }
    area(): number {
        return this.a*this.b;
    }
    //alt+enter => швидке створення класу

}
class Triangle extends Shape{
    constructor(private a:number,private b:number) {
        super();
    }
    perimetr(): number {
        return (this.a+this.b)*2;
    }
    area(): number {
        return this.a*this.b;
    }
    //alt+enter => швидке створення класу

}


const shapes:Shape[]=[
    new Triangle(6,5),
    new Rectangle(4,5)
]
for (const shape of shapes) {
    console.log(shape.area());
    console.log(shape.perimetr());

}