import PrimeVue from "primevue/config";
import type { App } from "vue";

export default async function setup(app: App) {
  app.use(PrimeVue);
}
