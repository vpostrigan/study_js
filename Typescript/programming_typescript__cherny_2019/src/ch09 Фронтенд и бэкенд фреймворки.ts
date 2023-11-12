// Фронтенд- и бэкенд-фреймворки

// [Фронтенд-фреймворки]
// Все встроенные API DOM типобезопасны. Чтобы использовать их из TypeScript в файл tsconfig.json проекта:
//{
//    "compilerOptions": {
//        "lib": ["dom", "es2015"]
//    }
//}

// При включенных декларациях типов DOM можно безопасно применять DOM и API браузера:
// Считывать свойства из глобального объекта окна.
let model = {
    url: window.location.href
}
// Создать элемент <input />.
let input09 = document.createElement('input')
// Наделить его CSS классами.
input09.classList.add('Input', 'URLInput')
// Обновлять модель в процессе ввода данных пользователем.
input09.addEventListener('change', () =>
    model.url = input09.value.toUpperCase()
)
// Внедрить <input /> в DOM.
document.body.appendChild(input09)

// код прошел проверку типов
document.querySelector('.Element').innerHTML // Ошибка TS2531: Объект, вероятно, 'null'.



// Использование TSX с React
import React from 'react'

type Props = {
    isDisabled?: boolean
    size: 'Big' | 'Small'
    text: string
    onClick(event: React.MouseEvent<HTMLButtonElement>): void
}
export function FancyButton(props: Props) {
    const [toggled, setToggled] = React.useState(false)
    return <button
        className={'Size-' + props.size}
        disabled={props.isDisabled || false}
        onClick={event => {
            setToggled(!toggled)
            props.onClick(event)
    }}
    >{props.text}</button>
}
let button = <FancyButton
    size='Big'
    text='Sign Up Now'
    onClick={() => console.log('Clicked!')}
/>

// Аналогично для компонента класса:
import React from 'react'
import {FancyButton} from './FancyButton'

type Props = {
    firstName: string
    userId: string
}
type State = {
    isLoading: boolean
}

class SignupForm extends React.Component<Props, State> {
    state = {
        isLoading: false
    }

    render() {
        return <>
            <h2>Sign up for a 7 - day supply of our tasty toothpaste now, {this.props.firstName}. < /h2>
        <FancyButton
            isDisabled = {this.state.isLoading}
            size = 'Big'
            text = 'Sign Up Now'
            onClick = {this.signUp}
        />
        </>
    }

    private signUp = async () => {
        this.setState({isLoading: true})
        try {
            await fetch('/api/signup?userId=' + this.props.userId)
        } finally {
            this.setState({isLoading: false})
        }
    }
}

let form = <SignupForm firstName='Albert' userId='13ab9g3' />



// Angular

// настройка
// npm install @angular/cli --global

// Angular CLI для инициализации нового приложения:
// ng new my-angular-app



// [Типобезопасные API]
// как клиенты и серверы со стопроцентной безопасностью типов могут типобезопасно взаимодействовать
// через нетипизированные сетевые протоколы вроде HTTP, TCP
type Request =
    | {entity: 'user', data: User}
    | {entity: 'location', data: Location}
// client.ts
async function get<R extends Request>(entity: R['entity']) : Promise<R['data']> {
    let res = await fetch(/api/${entity})
    let json = await res.json()
    if (!json) {
        throw ReferenceError('Empty response')
    }
    return json
}
// app.ts
async function startApp() {
    let user = await get('user') // User
}

// типизированные, кодогенерированные API:
// - Swagger для API REST.
// - Apollo и Relay для GraphQL.
// - gRPC и Apache Thrift для RPC.


// [Бэкенд-фреймворки]
// PostgreSQL, используя node-postgres
let client = new Client
let res = await client.query(
    'SELECT name FROM users where id = $1',
    [739311]
) // any
// MongoDB, используя node-mongodb-native
db.collection('users')
    .find({id: 739311})
    .toArray((err, user) =>
    // Пользователь является any
)

//или
db.collection('users')
    .find({id: 739311})
    .toArray((err, user: User) =>
    // Пользователь является any
)

// или использовать ORM
// наиболее полноценный ORM для TypeScript — это TypeORM (https://www.npmjs.com/package/typeorm)
let user = await UserRepository
    .findOne({id: 739311}) // User | undefined

