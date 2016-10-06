import React from 'react';
import ReactDOM from 'react-dom';
import {Button, File, Select, Text, Textarea, Toggle} from './index';

ReactDOM.render(
  <div>
    <h1>Examples of inputs</h1>
    <div>
      <h2>Buttons</h2>
      <div>
        <h3>Different sizes</h3>
        <Button text="Button" display="inline" size="big" />
        <Button text="Button" display="inline" size="standard" />
      </div>
      <div>
        <h3>Different colors</h3>
        <Button text="Button" display="inline" />
        <Button text="Button" display="inline" color="dark1" />
        <Button text="Button" display="inline" color="light1" colorHover="dark2"/>
        <Button text="Button" display="inline" color="success" />
        <Button text="Button" display="inline" color="primary" />
        <Button text="Button" display="inline" color="warning" />
        <Button text="Button" display="inline" color="danger" />
      </div>
      <div>
        <h3>With a logo</h3>
        <Button display="inline" color="danger" logo="FaClose" />
        <Button text="Delete" display="inline" color="danger" logo="FaClose" size="big" />
        <Button text="Delete" display="inline" color="danger" logo="FaBattery4" size="big" logo-side="right" />
        <Button text="Delete" display="inline" color="danger" logo="FaPlane" size="standard" />
      </div>
    </div>
    <div>
      <h2>Input files</h2>
      <div>
        <File name="picture" required multiple/>
      </div>
    </div>
    <div>
      <h2>Select</h2>
      <div>
        <Select name="select" options={[{text: 'Value 1', value: 'value1', selected: false}, {text: 'Value 2', value: 'value2', selected: true}]}/>
      </div>
    </div>
    <div>
      <h2>Text</h2>
      <div>
        <Text name="email" type="email" placeholder="email@example.com" autoComplete="email" pattern="[A-z0-9-\.]+@[A-z0-9-\.]+" errorMessage="The email address is not valid" required/>
      </div>
    </div>
    <div>
      <h2>Textarea</h2>
      <div>
        <Textarea name="email" placeholder="Some text..." pattern="[A-z0-9\s]+" errorMessage="Only letters, numbers and spaces." required resize="none"/>
      </div>
    </div>
    <div>
      <h2>Toggle</h2>
      <div>
        <Toggle name="toggle" defaultChecked />
      </div>
    </div>
  </div>,
  document.getElementById('app')
);
