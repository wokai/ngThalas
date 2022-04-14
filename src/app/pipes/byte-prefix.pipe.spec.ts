import { BytePrefixPipe } from './byte-prefix.pipe';

describe('BytePrefixPipe', () => {
  it('create an instance', () => {
    const pipe = new BytePrefixPipe();
    expect(pipe).toBeTruthy();
  });
});
