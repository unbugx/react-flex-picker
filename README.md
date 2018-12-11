# react-flex-picker [![Build Status](https://travis-ci.org/unbugx/react-flex-picker.svg?branch=master)](https://travis-ci.org/unbugx/react-flex-picker)

For online demo go to https://unbugx.github.io/react-flex-picker/

To run demo on your own computer:

* Clone this repository
* `npm install`
* `npm run storybook`
* Open http://localhost:9002/

## Getting Started

```
npm install --save react-flex-picker
```

Add the following import to your application if you use Webpack with CSS loader:

```
import 'react-flex-picker/dist/react-flex-picker.css';
```

#### Make own datepickers

Using a few simple components you can build your own calendar with any logic you want. 
Just import these components:

```
import {PickerProvider, PickerConsumer, DayPickerController, MonthPickerController} from 'react-flex-picker';
```

##### PickerProvider

This picker based on React Context Api. It creates provider that keeps all business logic and all data to control calendar. 
PickerProvider has following list of properties: 

|name|type|description|
|---|---|---|
|initialEndDate|Moment|Initial end date in range for range picker. Ignore for single picker.|
|initialStartDate|Moment|Initial start date in range for range picker. Also it is used as initial date for single picker.|
|isSingle|boolean|Switch to single picker.|
|isWeeksSelection|boolean|Switch to weeks selection.|
|locale|string|Current locale. Default value: `en`|
|maxDate|Moment|Maximum available date for choosing. All dates after maximum date will be disabled.|
|maxDaysCount|number|Maximum number of days in range.|
|minDate|Moment|Minimum available date for choosing. All dates before minimum date will be disabled.|
|minDaysCount|number|Minimum number of days in range.|
|onChangeWidth|function|Executes when picker width was changed. Sometimes this info can be useful when you build your own calendar.|
|onDatesChange|function(startDate: Moment, endDate: Moment)|Executes when new date is picked up.|
|onTitleClick|function|Executes when calendar title is clicked.|
|pickerType|string|PickerProvider has to know what type of picker it controls. Available values are `day`, `month`. Default value: `day`|
|showOutsideDays|boolean|First and last week of month will be filled with days from nearby months.|
|styles|object|Object with class names to override current css styles.|
|unitCount|number|Number of months for DayPickerController and number of years for MonthPickerController visible at a time. Default value: `1`|

##### PickerConsumer

Works as common consumer in context api. 
It takes function as child that has one arguments with set of useful properties. 
The most useful properties are `handlePrevUnit` and `handleNextUnit` to switch months or years.   

```
import * as React from 'react';
import {PickerProvider, PickerConsumer, DayPickerController} from 'react-flex-picker';
import * as moment from 'moment';

<PickerProvider
  initialStartDate={moment().add(-7, 'day')}
  onDatesChange={(startDate) => {console.log(startDate)}}
  isSingle
>
  <PickerConsumer>
    {({handlePrevUnit, handleNextUnit}) => (
      <div className='calendar'}>
        <div className='right' onClick={handleNextUnit}>&rarr;</div>
        <div className='left' onClick={handlePrevUnit}>&larr;</div>
        <DayPickerController />
      </div>
    )}
  </PickerConsumer>
</PickerProvider>  
```  

##### DayPickerController and MonthPickerController

Widgets of day picker and month picker accordingly.

#### Examples

Coming soon...