
// TSX

// TSX поддерживает два вида элементов: встроенные (неотъемлемые элементы) и пользовательские (основанные на значениях).
//
// Неотъемлемые элементы имеют имена в нижнем регистре и относятся к встроенным вроде <li>, <hl> и <div>.
//
// Элементы, основанные на значениях, имеют имена в PascalCase (все слова имени начинаются с прописных букв)
// и относятся к тем, которые вы создаете посредством React
// (или другого фронтендфреймворка, с которым используете TSX). Они могут быть определены как функции или классы.

// Вот как React подключается в TSX для безопасной типизации JSX:
declare global {
  namespace JSX {
    interface Element extends React.ReactElement<any> { //  это тип TSX-элемента, основанного на значении
    }

    interface ElementClass extends React.Component<any> { // это тип экземпляра компонента класса, основанного на значении
      render(): React.ReactNode
    }

    interface ElementAttributesProperty { // это имя свойства, по которому TypeScript выясняет, какие атрибуты поддерживает компонент.
      props: {}
    }

    interface ElementChildrenAttribute { // это имя свойства, по которому TypeScript определяет, какие типы потомков поддерживает компонент.
      children: {}
    }

    // это набор атрибутов, которые поддерживают все неотъемлемые элементы.
    type LibraryManagedAttributes<C, P> = // ...

    // это набор атрибутов, поддерживаемых всеми компонентами класса
    interface IntrinsicAttributes extends React.Attributes {
    }

    // определяет другие места, где элементы JSX могут объявлять и инициализировать типы свойств.
    interface IntrinsicClassAttributes<T> extends React.ClassAttributes<T> {
    }

    interface IntrinsicClassAttributes<T>
      extends React.ClassAttributes<T> {
    }

    // перечисляет каждый тип HTML-элемента, который вы можете использовать в TSX,
    // отображая имя тега каждого элемента в типы его атрибутов и потомков
    interface IntrinsicElements {
      a: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>
      abbr: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
      address: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
      // ...
    }
  }
}
