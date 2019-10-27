import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hasImage'
})
export class HasImagePipe implements PipeTransform {

  transform(imgPath: any, ...args: any[]): any {
    if (imgPath === '' || imgPath == null || imgPath == undefined) {
      return '../../assets/images/image-not-found.png';
    }

    return imgPath;
  }

}
