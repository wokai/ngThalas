/// Angular modules
import { NgModule                } from '@angular/core';
import { BrowserModule           } from '@angular/platform-browser';
import { Routes, RouterModule    } from '@angular/router';
import { HttpClientModule        } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule             } from '@angular/forms';                       /// ngModel

/// Angular material
import { FlexLayoutModule   } from '@angular/flex-layout';
import { MatBadgeModule     } from '@angular/material/badge';
import { MatButtonModule    } from '@angular/material/button';
import { MatCardModule      } from '@angular/material/card';
import { MatChipsModule     } from '@angular/material/chips';
import { MatDialogModule    } from '@angular/material/dialog';
import { MatDividerModule   } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatGridListModule  } from '@angular/material/grid-list';
import { MatIconModule      } from '@angular/material/icon';
import { MatInputModule     } from '@angular/material/input'; 
import { MatListModule      } from '@angular/material/list';
import { MatSidenavModule   } from '@angular/material/sidenav';
import { MatTableModule     } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule    } from '@angular/material/select';
import { MatToolbarModule   } from '@angular/material/toolbar';
import { MatTooltipModule   } from '@angular/material/tooltip';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

/// Bootstrap
import { NgbModule          } from '@ng-bootstrap/ng-bootstrap';

/// Components
import { AppComponent         } from './app.component';
import { DevicesComponent     } from './devices/devices.component';
import { ParametersComponent  } from './parameters/parameters.component';
import { HomeComponent        } from './home/home.component';
import { XenonDeviceComponent } from './devices/xenon-device/xenon-device.component';
import { BytePrefixPipe       } from './pipes/byte-prefix.pipe';
import { TimeSegmentsPipe     } from './pipes/time-segments.pipe';
import { IsoTimePipe          } from './pipes/iso-time.pipe';
import { IsoDatePipe          } from './pipes/iso-date.pipe';
import { BoolComponent        } from './bool/bool.component';
import { VentTableComponent   } from './devices/xenon-device/vent-table/vent-table.component';
import { TimeDisplayComponent } from './time-display/time-display.component';
import { DeviceStatusComponent  } from './devices/xenon-device/device-status/device-status.component';
import { IntervalComponent      } from './devices/interval/interval.component';
import { RespDisplayComponent   } from './database/resp-display/resp-display.component';
import { EpisodeFrameComponent  } from './database/episode-frame/episode-frame.component';
import { DatabaseComponent      } from './database/database.component';
import { EpisodeDetailComponent } from './database/episode-detail/episode-detail.component';
import { RespChartComponent } from './database/resp-display/resp-chart/resp-chart.component';

const routes: Routes = [
  { path : 'home',    component: HomeComponent }, 
  { path : 'devices', component: DevicesComponent },
  { path : 'params',  component: ParametersComponent },
  { path : 'db',      component: DatabaseComponent },
  { path : ''       , redirectTo: '/home', pathMatch: 'full' },
  { path : '**'     , redirectTo: '/home', pathMatch: 'full' }
];


@NgModule({
  declarations: [
    AppComponent,
    DevicesComponent,
    ParametersComponent,
    HomeComponent,
    XenonDeviceComponent,
    BytePrefixPipe,
    TimeSegmentsPipe,
    IsoTimePipe,
    IsoDatePipe,
    BoolComponent,
    DeviceStatusComponent,
    VentTableComponent,
    TimeDisplayComponent,
    IntervalComponent,
    RespDisplayComponent,
    EpisodeFrameComponent,
    DatabaseComponent,
    EpisodeDetailComponent,
    RespChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,    
    MatChipsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,  
    MatSidenavModule,  
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatToolbarModule,
    MatTooltipModule,
    MatButtonToggleModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
