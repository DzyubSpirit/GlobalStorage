# GlobalStorage

## Концепция

Это распределенная СУБД для стека технологий [Metarhia](https://github.com/metarhia/Metarhia)
построенная на следующих принципах:
* Встраивание в процесс сервера приложений [Impress](https://github.com/metarhia/Impress)
для того, чтобы избежать лишнего межпроцессового взаимодействия;
* Глубокая совместимость с сетевым протоколом [JSTP](https://github.com/metarhia/JSTP),
данные хранятся на диске и памяти в формате, близком протоколу;
* Формат передачи данных по протоколу и формат хранения могут не содержать
идентификаторов полей, что уменьшает их размер; значения полей хранятся в
массивах, которые можно поставить в соответствие полям модели (схеме/метаданным)
позиционным сопоставлением;
* Максимальное использование памяти, упреждающее чтение, отложенная запись,
минимизация преобразования данных;
* Использование метаданных, специального декларативного формата описания
предметной области, включая сущности, связи и атрибуты из которого можно
автоматически построить схему хранения в реляционной СУБД, структуры памяти и
структуры для бессхемных СУБД, различные GUI, серверное API и т.д.;
* Реализация движков с одинаковым API доступа к данным на клиенте и на сервере:
  - имеет движок хранения на сервере;
  - имеет движки хранения на клиенте (несколько реализаций для разных платформ);
  - позволяет нескольким серверам объединяться для распределенного хранения;
  - позволяет нескольким клиентам обмениваться данными в режиме P2P;
* Синхронизация данных между клиентом и сервером в как в реальном режиме
времени, так и в отложенном режиме, т.е. возможность работать в онлайне
(интерактивно вместе с другими пользователями), так и в оффлайне с данными,
сохраненными в локальном хранилище, и иметь двухстороннюю синхронизацию данных
с версионностью и ветвлением, как в git;
* Глобальная унификация структур данных в рамках всех систем, работающих на
стеке технологий [Metarhia](https://github.com/metarhia/Metarhia), т.е.
[GlobalStorage](https://github.com/metarhia/GlobalStorage),
[Impress](https://github.com/metarhia/Impress),
[JSTP](https://github.com/metarhia/JSTP) и
[Console](https://github.com/metarhia/Console) через модерируемые распределенные
репозитории структур данных;
* Возможность работать с не унифицированными данными, специфическими для
конкретных систем;
* GlobalStorage предоставляет абстракцию слоя доступа к данным, т.е. заменяет
ORM системы, но не обязательно делает мапинг на реляционную модель, хоть такая
возможность тоже встроена;
* Данные имеют сквозную идентификацию во всей системе, т.е. вставка данных может
быть распределенной и не приведет к конфликтам идентификаторов;
* Достоверность данных обеспечивается их распределенным хранением, версионностью
и подписыванием версий хешами.

## Metamodel Definition Language

Язык описания метамодели. По этому описанию мы динамически строим прототипы и
можем присвоить такой прототип позиционному массиву, чтобы с ним можно было
работать как с объектом.

Пример:
```js
{
  code: { type: 'string', primary: true },
  name: {
    caption: 'City',
    type: 'string',
    size: 32,
    nullable: false,
    index: { unique: false },
    master: { dataset: 'Cities', key: 'name' }
  },
  birth: 'Date',
  city: 'string',
  addresses: {
    type: { array: 'Address' }
  },
  gender: {
    type: 'char',
    lookup: { dictionary: { M: 'Male', F: 'Female' } }
  },
  age: function() {
    var difference = new Date() - this.birth;
    return Math.floor(difference / 31536000000);
  }
}
```

Типы данных:
- Все встроенные типы JavaScript: string, number, boolean, Date
- Встроенные типы GS: id, uid, tree, ip и другие
- Типы данных реляционных СУБД: char, int, real, text, money, time, date...
- Ссылки на другие структуры, определенные в GlobalStorage
- Ссылки на структуры, определенные в приложении

## JavaScript Query Language

Язык запросов к структурам данных. Описание и примеры данных и запросов лежат в
отдельном репозитории: [metarhia/JSQL](https://github.com/metarhia/JSQL)
Реализация JSQL будет частью библиотеки JSTP.

## Distributed Metamodel Repository

Распределенный репозиторий метамоделей

## Data Access Layer

Слой доступа к данным
