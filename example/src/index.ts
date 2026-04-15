import { booleanFlag } from '@flagly/node';

class FeatureA {
  @booleanFlag({
    key: 'feature-A',
    defaultValue: true,
  })
  invoke() {
    console.log('This is feature A');
  }
}

const instance = new FeatureA();
instance.invoke();
