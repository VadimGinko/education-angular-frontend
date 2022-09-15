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

import { CourseDto } from '../models/course-dto';

@Injectable({
  providedIn: 'root',
})
export class CourseControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getByCourseId
   */
  static readonly GetByCourseIdPath = '/api/v1/courses/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getByCourseId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getByCourseId$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<CourseDto>> {

    const rb = new RequestBuilder(this.rootUrl, CourseControllerService.GetByCourseIdPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CourseDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getByCourseId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getByCourseId(params: {
    id: number;
  }): Observable<CourseDto> {

    return this.getByCourseId$Response(params).pipe(
      map((r: StrictHttpResponse<CourseDto>) => r.body as CourseDto)
    );
  }

  /**
   * Path part for operation updateCourse
   */
  static readonly UpdateCoursePath = '/api/v1/courses/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateCourse()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCourse$Response(params: {
    id: number;
    body: CourseDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CourseControllerService.UpdateCoursePath, 'put');
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
   * To access the full response (for headers, for example), `updateCourse$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCourse(params: {
    id: number;
    body: CourseDto
  }): Observable<void> {

    return this.updateCourse$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation removeCourseById
   */
  static readonly RemoveCourseByIdPath = '/api/v1/courses/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeCourseById()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeCourseById$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CourseControllerService.RemoveCourseByIdPath, 'delete');
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
   * To access the full response (for headers, for example), `removeCourseById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeCourseById(params: {
    id: number;
  }): Observable<void> {

    return this.removeCourseById$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAllCourses
   */
  static readonly GetAllCoursesPath = '/api/v1/courses/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllCourses()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCourses$Response(params?: {
  }): Observable<StrictHttpResponse<Array<CourseDto>>> {

    const rb = new RequestBuilder(this.rootUrl, CourseControllerService.GetAllCoursesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CourseDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllCourses$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCourses(params?: {
  }): Observable<Array<CourseDto>> {

    return this.getAllCourses$Response(params).pipe(
      map((r: StrictHttpResponse<Array<CourseDto>>) => r.body as Array<CourseDto>)
    );
  }

  /**
   * Path part for operation createCourse
   */
  static readonly CreateCoursePath = '/api/v1/courses/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createCourse()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createCourse$Response(params: {
    body: CourseDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CourseControllerService.CreateCoursePath, 'post');
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
   * To access the full response (for headers, for example), `createCourse$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createCourse(params: {
    body: CourseDto
  }): Observable<void> {

    return this.createCourse$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getTeacherCourses1
   */
  static readonly GetTeacherCourses1Path = '/api/v1/courses/teacher-courses';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTeacherCourses1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTeacherCourses1$Response(params?: {
  }): Observable<StrictHttpResponse<Array<CourseDto>>> {

    const rb = new RequestBuilder(this.rootUrl, CourseControllerService.GetTeacherCourses1Path, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CourseDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTeacherCourses1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTeacherCourses1(params?: {
  }): Observable<Array<CourseDto>> {

    return this.getTeacherCourses1$Response(params).pipe(
      map((r: StrictHttpResponse<Array<CourseDto>>) => r.body as Array<CourseDto>)
    );
  }

  /**
   * Path part for operation removeProgress
   */
  static readonly RemoveProgressPath = '/api/v1/courses/progress/{courseId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeProgress()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeProgress$Response(params: {
    courseId: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CourseControllerService.RemoveProgressPath, 'delete');
    if (params) {
      rb.path('courseId', params.courseId, {});
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
   * To access the full response (for headers, for example), `removeProgress$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeProgress(params: {
    courseId: number;
  }): Observable<void> {

    return this.removeProgress$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
