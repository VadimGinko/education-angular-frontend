/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { CourseTypeDto } from '../models/course-type-dto';

@Injectable({
  providedIn: 'root',
})
export class CourseTypeControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation findCourseTypeById
   */
  static readonly FindCourseTypeByIdPath = '/api/v1/course-types/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findCourseTypeById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findCourseTypeById$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<CourseTypeDto>> {

    const rb = new RequestBuilder(this.rootUrl, CourseTypeControllerService.FindCourseTypeByIdPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CourseTypeDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findCourseTypeById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findCourseTypeById(params: {
    id: number;
  }): Observable<CourseTypeDto> {

    return this.findCourseTypeById$Response(params).pipe(
      map((r: StrictHttpResponse<CourseTypeDto>) => r.body as CourseTypeDto)
    );
  }

  /**
   * Path part for operation updateCourseType
   */
  static readonly UpdateCourseTypePath = '/api/v1/course-types/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateCourseType()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCourseType$Response(params: {
    id: number;
    body: CourseTypeDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CourseTypeControllerService.UpdateCourseTypePath, 'put');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateCourseType$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCourseType(params: {
    id: number;
    body: CourseTypeDto
  }): Observable<void> {

    return this.updateCourseType$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation removeCourseTypeById
   */
  static readonly RemoveCourseTypeByIdPath = '/api/v1/course-types/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeCourseTypeById()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeCourseTypeById$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CourseTypeControllerService.RemoveCourseTypeByIdPath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `removeCourseTypeById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeCourseTypeById(params: {
    id: number;
  }): Observable<void> {

    return this.removeCourseTypeById$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation findAllCourseTypes
   */
  static readonly FindAllCourseTypesPath = '/api/v1/course-types/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllCourseTypes()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllCourseTypes$Response(params?: {
  }): Observable<StrictHttpResponse<Array<CourseTypeDto>>> {

    const rb = new RequestBuilder(this.rootUrl, CourseTypeControllerService.FindAllCourseTypesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CourseTypeDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findAllCourseTypes$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllCourseTypes(params?: {
  }): Observable<Array<CourseTypeDto>> {

    return this.findAllCourseTypes$Response(params).pipe(
      map((r: StrictHttpResponse<Array<CourseTypeDto>>) => r.body as Array<CourseTypeDto>)
    );
  }

  /**
   * Path part for operation createCourseType
   */
  static readonly CreateCourseTypePath = '/api/v1/course-types/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createCourseType()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createCourseType$Response(params: {
    body: CourseTypeDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CourseTypeControllerService.CreateCourseTypePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createCourseType$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createCourseType(params: {
    body: CourseTypeDto
  }): Observable<void> {

    return this.createCourseType$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
