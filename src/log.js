
import * as Sentry from '@sentry/browser';
import Vue from 'vue';

Sentry.init({
  dsn: window.__SENTRY_DNS__,
  integrations: [new Sentry.Integrations.Vue({ Vue })]
});