import 'jest-preset-angular/setup-jest';
import 'jest-preset-angular/setup-jest';
import 'zone.js';
import 'zone.js/testing';

Object.defineProperty(window, 'matchMedia', {
  value: () => ({
    matches: false,
    addListener: () => {},
    removeListener: () => {}
  })
});

if (!window.location.origin) {
  (window.location as any).origin = 'http://localhost:3002';
}