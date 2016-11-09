import React from 'react';
import ReactDOM from 'react-dom';
import {Button, File, Select, Text, Textarea, Toggle} from './inputs';

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
        <Button text="Default" display="inline" />
        <Button text="Dark" display="inline" color="#555" />
        <Button text="White" display="inline" color="#fff" colorHover="#555"/>
        <Button text="Success" display="inline" color="#449d44" />
        <Button text="Primary" display="inline" color="#337ab7" />
        <Button text="Info" display="inline" color="#31b0d5" />
        <Button text="Warning" display="inline" color="#ec971f" />
        <Button text="Danger" display="inline" color="#c9302c" />
      </div>
      <div>
        <h3>With a logo</h3>
        <Button display="inline" logo="FaClose" />
        <Button text="Delete" display="inline" logo="FaClose" size="big" />
        <Button text="Delete" display="inline" logoRight="FaClose" size="big" />
        <Button text="Delete" display="inline" logo="FaClose" logoRight="FaClose" size="big" />
        <Button text="Battery" display="inline" logo="FaBattery4" size="big" logo-side="right" />
        <Button text="Flights" display="inline" logo="FaPlane" size="standard" />
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
        <Select name="select" defaultText="Select an option" options={[{text: 'Value 1', value: 'value1', selected: false}, {text: 'Value 2', value: 'value2', selected: true}]}/>
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
  document.getElementById('root')
);
