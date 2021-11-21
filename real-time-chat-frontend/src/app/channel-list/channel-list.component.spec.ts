import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelListComponent } from './channel-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { Channel } from '../channel/channel.model';
import { environment } from '../../environments/environment';

describe('ChannelListComponent', () => {
  let component: ChannelListComponent;
  let fixture: ComponentFixture<ChannelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ChannelListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should should fetch channels on component initialization and correctly handle loading spinner display', () => {
    const httpClient: HttpClient = TestBed.get(HttpClient);
    const getChannelsMockedResponse: Channel[] = [
      {
        orderId: 1,
        geoReferenceId: 2,
        userId: '3',
        _id: '4',
      },
      {
        orderId: 5,
        geoReferenceId: 6,
        userId: '7',
        _id: '8',
      },
    ];
    const httpClientGetSpy: jasmine.Spy = spyOn(
      httpClient,
      'get'
    ).and.returnValue(of(getChannelsMockedResponse));
    expect(component.isFetchingData).toBeTrue();
    fixture.detectChanges(); // calling component ngOnInit
    expect(httpClientGetSpy).toHaveBeenCalledOnceWith(
      `${environment.apiBaseUrl}/channel`
    );
    expect(component.dataSource).toEqual(getChannelsMockedResponse);
    expect(component.isFetchingData).toBeFalse();
  });

  it('should should delete channel and refresh channels afterwards if it succeeded', () => {
    const httpClient: HttpClient = TestBed.get(HttpClient);
    const httpClientDeleteSpy: jasmine.Spy = spyOn(
      httpClient,
      'delete'
    ).and.returnValue(of(null));
    const fetchChannelsSpy: jasmine.Spy = spyOn(component, 'fetchChannels');

    component.deleteChannel('1');
    expect(fetchChannelsSpy).toHaveBeenCalledTimes(1);
  });

  it('should should delete channel and not refresh channels afterwards in case of error', () => {
    const httpClient: HttpClient = TestBed.get(HttpClient);
    const httpClientDeleteSpy: jasmine.Spy = spyOn(
      httpClient,
      'delete'
    ).and.returnValue(throwError('error message'));
    const fetchChannelsSpy: jasmine.Spy = spyOn(component, 'fetchChannels');

    component.deleteChannel('1');
    expect(fetchChannelsSpy).toHaveBeenCalledTimes(0);
  });
});
