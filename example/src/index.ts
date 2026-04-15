import { booleanFlag, withBooleanFlag } from '@flagly/node';

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

const invokeFeatureB = withBooleanFlag({
  key: 'feature-B',
  defaultValue: false,
})(() => {
  console.log('This is feature B');
});

invokeFeatureB();
