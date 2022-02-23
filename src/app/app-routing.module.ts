import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodayComponent } from './pages/today/today.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'today',
		pathMatch: 'full'
	},
	{
		path: 'today',
		component: TodayComponent
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
