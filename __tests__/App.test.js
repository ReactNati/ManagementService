import App from '../App'
import renderer from 'react-test-renderer';

it('renders correctly', async () => {
  jest.useFakeTimers();
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });