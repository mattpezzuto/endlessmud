import { Routes } from '@angular/router';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { CharacterSelectionComponent } from './character-selection/character-selection.component';

export const routes: Routes = [
    { path: 'mainScreen', component: MainScreenComponent },
    { path: 'characterScreen', component: CharacterSelectionComponent },
    { path: '', redirectTo: '/mainScreen', pathMatch: 'full' }, // Default route
  
];
