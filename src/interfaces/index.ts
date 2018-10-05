import { ApplicationState } from 'hapi';

export interface AppState extends ApplicationState {
  git: {
    url: string;
  };
  version: string;
  name: string;
}
