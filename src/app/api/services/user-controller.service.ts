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

import { ChangeUserStatusDto } from '../models/change-user-status-dto';
import { CourseDto } from '../models/course-dto';
import { LoginRequestDto } from '../models/login-request-dto';
import { LoginResponseDto } from '../models/login-response-dto';
import { RegistrationRequestDto } from '../models/registration-request-dto';
import { ReviewDto } from '../models/review-dto';
import { SubscriptionDto } from '../models/subscription-dto';
import { UserDto } from '../models/user-dto';

@Injectable({
  providedIn: 'root',
})
export class UserControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getUserById
   */
  static readonly GetUserByIdPath = '/api/v1/users/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUserById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserById$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<UserDto>> {

    const rb = new RequestBuilder(this.rootUrl, UserControllerService.GetUserByIdPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getUserById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserById(params: {
    id: number;
  }): Observable<UserDto> {

    return this.getUserById$Response(params).pipe(
      map((r: StrictHttpResponse<UserDto>) => r.body as UserDto)
    );
  }

  /**
   * Path part for operation updateUserInfo
   */
  static readonly UpdateUserInfoPath = '/api/v1/users/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateUserInfo()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUserInfo$Response(params: {
    id: number;
    body: UserDto
  }): Observable<StrictHttpResponse<UserDto>> {

    const rb = new RequestBuilder(this.rootUrl, UserControllerService.UpdateUserInfoPath, 'put');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateUserInfo$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUserInfo(params: {
    id: number;
    body: UserDto
  }): Observable<UserDto> {

    return this.updateUserInfo$Response(params).pipe(
      map((r: StrictHttpResponse<UserDto>) => r.body as UserDto)
    );
  }

  /**
   * Path part for operation updatePassword
   */
  static readonly UpdatePasswordPath = '/api/v1/users/{id}/password';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updatePassword()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePassword$Response(params: {
    id: number;
    body: string
  }): Observable<StrictHttpResponse<UserDto>> {

    const rb = new RequestBuilder(this.rootUrl, UserControllerService.UpdatePasswordPath, 'put');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updatePassword$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePassword(params: {
    id: number;
    body: string
  }): Observable<UserDto> {

    return this.updatePassword$Response(params).pipe(
      map((r: StrictHttpResponse<UserDto>) => r.body as UserDto)
    );
  }

  /**
   * Path part for operation getSubscriptionByCourseId
   */
  static readonly GetSubscriptionByCourseIdPath = '/api/v1/users/subscriptions';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSubscriptionByCourseId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSubscriptionByCourseId$Response(params: {
    courseId: number;
  }): Observable<StrictHttpResponse<SubscriptionDto>> {

    const rb = new RequestBuilder(this.rootUrl, UserControllerService.GetSubscriptionByCourseIdPath, 'get');
    if (params) {
      rb.query('courseId', params.courseId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SubscriptionDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSubscriptionByCourseId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSubscriptionByCourseId(params: {
    courseId: number;
  }): Observable<SubscriptionDto> {

    return this.getSubscriptionByCourseId$Response(params).pipe(
      map((r: StrictHttpResponse<SubscriptionDto>) => r.body as SubscriptionDto)
    );
  }

  /**
   * Path part for operation updateSubscription
   */
  static readonly UpdateSubscriptionPath = '/api/v1/users/subscriptions';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateSubscription()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateSubscription$Response(params: {
    body: SubscriptionDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UserControllerService.UpdateSubscriptionPath, 'put');
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
   * To access the full response (for headers, for example), `updateSubscription$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateSubscription(params: {
    body: SubscriptionDto
  }): Observable<void> {

    return this.updateSubscription$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation subscribe
   */
  static readonly SubscribePath = '/api/v1/users/subscriptions';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `subscribe()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  subscribe$Response(params: {
    body: CourseDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UserControllerService.SubscribePath, 'post');
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
   * To access the full response (for headers, for example), `subscribe$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  subscribe(params: {
    body: CourseDto
  }): Observable<void> {

    return this.subscribe$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation changeUserStatus
   */
  static readonly ChangeUserStatusPath = '/api/v1/users/status';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `changeUserStatus()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changeUserStatus$Response(params: {
    body: ChangeUserStatusDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UserControllerService.ChangeUserStatusPath, 'put');
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
   * To access the full response (for headers, for example), `changeUserStatus$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changeUserStatus(params: {
    body: ChangeUserStatusDto
  }): Observable<void> {

    return this.changeUserStatus$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation register
   */
  static readonly RegisterPath = '/api/v1/users/register';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `register()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  register$Response(params: {
    body: RegistrationRequestDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UserControllerService.RegisterPath, 'post');
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
   * To access the full response (for headers, for example), `register$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  register(params: {
    body: RegistrationRequestDto
  }): Observable<void> {

    return this.register$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation login
   */
  static readonly LoginPath = '/api/v1/users/login';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `login()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  login$Response(params: {
    body: LoginRequestDto
  }): Observable<StrictHttpResponse<LoginResponseDto>> {

    const rb = new RequestBuilder(this.rootUrl, UserControllerService.LoginPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<LoginResponseDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `login$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  login(params: {
    body: LoginRequestDto
  }): Observable<LoginResponseDto> {

    return this.login$Response(params).pipe(
      map((r: StrictHttpResponse<LoginResponseDto>) => r.body as LoginResponseDto)
    );
  }

  /**
   * Path part for operation getUserByEmail
   */
  static readonly GetUserByEmailPath = '/api/v1/users';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUserByEmail()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserByEmail$Response(params: {
    email: string;
  }): Observable<StrictHttpResponse<UserDto>> {

    const rb = new RequestBuilder(this.rootUrl, UserControllerService.GetUserByEmailPath, 'get');
    if (params) {
      rb.query('email', params.email, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getUserByEmail$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserByEmail(params: {
    email: string;
  }): Observable<UserDto> {

    return this.getUserByEmail$Response(params).pipe(
      map((r: StrictHttpResponse<UserDto>) => r.body as UserDto)
    );
  }

  /**
   * Path part for operation getTeacherCourses
   */
  static readonly GetTeacherCoursesPath = '/api/v1/users/{id}/courses';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTeacherCourses()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTeacherCourses$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<Array<CourseDto>>> {

    const rb = new RequestBuilder(this.rootUrl, UserControllerService.GetTeacherCoursesPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `getTeacherCourses$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTeacherCourses(params: {
    id: number;
  }): Observable<Array<CourseDto>> {

    return this.getTeacherCourses$Response(params).pipe(
      map((r: StrictHttpResponse<Array<CourseDto>>) => r.body as Array<CourseDto>)
    );
  }

  /**
   * Path part for operation getUnSubscribedCoursesByFilters
   */
  static readonly GetUnSubscribedCoursesByFiltersPath = '/api/v1/users/unsubscribed-courses';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUnSubscribedCoursesByFilters()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUnSubscribedCoursesByFilters$Response(params: {
    status: 'ACTIVE' | 'IN_ACTIVE';
    name?: string;
    type?: string;
  }): Observable<StrictHttpResponse<Array<CourseDto>>> {

    const rb = new RequestBuilder(this.rootUrl, UserControllerService.GetUnSubscribedCoursesByFiltersPath, 'get');
    if (params) {
      rb.query('status', params.status, {});
      rb.query('name', params.name, {});
      rb.query('type', params.type, {});
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
   * To access the full response (for headers, for example), `getUnSubscribedCoursesByFilters$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUnSubscribedCoursesByFilters(params: {
    status: 'ACTIVE' | 'IN_ACTIVE';
    name?: string;
    type?: string;
  }): Observable<Array<CourseDto>> {

    return this.getUnSubscribedCoursesByFilters$Response(params).pipe(
      map((r: StrictHttpResponse<Array<CourseDto>>) => r.body as Array<CourseDto>)
    );
  }

  /**
   * Path part for operation getSubscribedCourses
   */
  static readonly GetSubscribedCoursesPath = '/api/v1/users/subscribed-courses';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSubscribedCourses()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSubscribedCourses$Response(params?: {
  }): Observable<StrictHttpResponse<Array<CourseDto>>> {

    const rb = new RequestBuilder(this.rootUrl, UserControllerService.GetSubscribedCoursesPath, 'get');
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
   * To access the full response (for headers, for example), `getSubscribedCourses$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSubscribedCourses(params?: {
  }): Observable<Array<CourseDto>> {

    return this.getSubscribedCourses$Response(params).pipe(
      map((r: StrictHttpResponse<Array<CourseDto>>) => r.body as Array<CourseDto>)
    );
  }

  /**
   * Path part for operation confirm
   */
  static readonly ConfirmPath = '/api/v1/users/register/confirm';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `confirm()` instead.
   *
   * This method doesn't expect any request body.
   */
  confirm$Response(params: {
    token: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UserControllerService.ConfirmPath, 'get');
    if (params) {
      rb.query('token', params.token, {});
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
   * To access the full response (for headers, for example), `confirm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  confirm(params: {
    token: string;
  }): Observable<void> {

    return this.confirm$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation logout
   */
  static readonly LogoutPath = '/api/v1/users/logout';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `logout()` instead.
   *
   * This method doesn't expect any request body.
   */
  logout$Response(params?: {
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UserControllerService.LogoutPath, 'get');
    if (params) {
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
   * To access the full response (for headers, for example), `logout$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  logout(params?: {
  }): Observable<void> {

    return this.logout$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getTasksForReview
   */
  static readonly GetTasksForReviewPath = '/api/v1/users/courses/{id}/review';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTasksForReview()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTasksForReview$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<Array<ReviewDto>>> {

    const rb = new RequestBuilder(this.rootUrl, UserControllerService.GetTasksForReviewPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ReviewDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTasksForReview$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTasksForReview(params: {
    id: number;
  }): Observable<Array<ReviewDto>> {

    return this.getTasksForReview$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ReviewDto>>) => r.body as Array<ReviewDto>)
    );
  }

}
