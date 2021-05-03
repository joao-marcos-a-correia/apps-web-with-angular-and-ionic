import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { SecurityUtil } from '../utils/security.util';

@Injectable()
export class ManagerGuard implements CanActivate {
    constructor() {
    }

    canActivate() {
        return SecurityUtil.isInRole('manager');
    }
}
