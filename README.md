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

Язык описания метамодели

## Distributed Metamodel Repository

Распределенный репозиторий метамоделей

## Data Access Layer

Слой доступа к данным
