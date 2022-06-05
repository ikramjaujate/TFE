import React from 'react' ;
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';


import 'jest-enzyme' ;
import 'jest-styled-components';
import Login from '../pages/Login/Login';
import renderer from 'react-test-renderer';


Enzyme.configure({ adapter: new Adapter() });


  describe('Login component', () => {

    it('Vérifier existantce des inputs', () => {
      const wrapper = shallow(<Login/>);
      expect(wrapper.find('input')).toHaveLength(0);
      //expect(modalTitle).toHaveProperty("backgroundColor", '#ffffff');
    })
    it('Vérifier existance password', () => {
      const wrapper = shallow(<Login/>);
      expect(wrapper.find('.password')).toHaveLength(0);
      //expect(modalTitle).toHaveProperty("backgroundColor", '#ffffff');
    })
    it('Check classname utilisé', () => {
      const container = renderer.create(<Login/>)
      const instance = container.root
      const element = instance.findByType("div");
      expect(element.props.className.includes("login")).toBe(true);

    });
    

  });