import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  HostListener,
  AfterViewInit,
} from '@angular/core';
import { url } from 'inspector';

@Component({
  selector: 'app-whiteboard',
  templateUrl: './whiteboard.component.html',
  styleUrls: ['./whiteboard.component.css'],
})
export class WhiteboardComponent implements OnInit, AfterViewInit {
  // lineColor = 'blue';
  // lineWidth = 5;

  @Input() canvasMeta: any;
  @ViewChild('canvas') public canvas: ElementRef;
  @ViewChild('lColor') public lColor: ElementRef;
  @ViewChild('lineWidth') public lWidth: ElementRef;
  @ViewChild('bgColor') public bgColor: ElementRef;
  @ViewChild('download') public download: ElementRef;
  private ctx: CanvasRenderingContext2D;
  _canvasWidth;
  _canvasHeight;
  bg_color = '#00ffff';
  private _canvasPoints = [];

  private _mouseDown: boolean = false;
  private _mousePosition = {
    oldX: 0,
    oldY: 0,
    newX: 0,
    newY: 0,
    settings: { color: '', size: 0 },
  };
  constructor(private el: ElementRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');

    this.ctx.canvas.width = 1109; //this.canvasMeta.width;
    this.ctx.canvas.height = 1000; //this.canvasMeta.height;
    this.bg_color = this.bgColor.nativeElement.value;
    this.ctx.canvas.style.background = this.bg_color;
    // this.ctx.fillStyle= 'white';//this.bgColor.nativeElement.value;
    // this.ctx.fillRect(0,0,1000,1000);
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  @HostListener('click')
  onclick() {
    this.bg_color = this.bgColor.nativeElement.value;
    this.ctx.canvas.style.background = this.bg_color;
    this.ctx.canvas.style.cursor = "url('../../../assets/icons/pencil.png')"; //???
    // this.ctx.fillStyle = this.bgColor.nativeElement.value;
    // this.ctx.fillRect(0,0,1000,1000);
  }

  @HostListener('mousedown')
  onMousedown() {
    this._mouseDown = true;
  }

  @HostListener('mouseup')
  onMouseup() {
    this._mouseDown = false;
  }

  @HostListener('mousemove', ['$event'])
  onMousemove(event: MouseEvent) {
    if (this._mouseDown) {
      /*
			this._mousePosition.oldX = this._mousePosition.newX;
			this._mousePosition.oldY = this._mousePosition.newY;

			this._mousePosition.newX = event.clientX - this.canvasComponent.nativeElement.getBoundingClientRect().left;
			this._mousePosition.newY = event.clientY - this.canvasComponent.nativeElement.getBoundingClientRect().top;
			*/
      this._mousePosition.settings.size = this.lWidth.nativeElement.value;
      this._mousePosition.settings.color = this.lColor.nativeElement.value;

      this._canvasPoints.push({
        x:
          event.clientX -
          this.canvas.nativeElement.getBoundingClientRect().left,
        y:
          event.clientY - this.canvas.nativeElement.getBoundingClientRect().top,
        settings: {
          size: this.lWidth.nativeElement.value,
          color: this.lColor.nativeElement.value,
        },
      });

      this.drawLine(this._canvasPoints);
    } else {
      this._canvasPoints = [];
      this._mousePosition.newX =
        event.clientX - this.canvas.nativeElement.getBoundingClientRect().left;
      this._mousePosition.newY =
        event.clientY - this.canvas.nativeElement.getBoundingClientRect().top;
    }
  }
  drawLine(drawData) {
    /*
      console.log(mousePos.oldX - mousePos.newX);
      this.ctx.beginPath();
      this.ctx.lineWidth = mousePos.settings.size;
          this.ctx.lineCap = 'round';
          this.ctx.lineJoin = 'round';
          this.ctx.shadowBlur = 2;
        this.ctx.shadowColor = mousePos.settings.color;
      this.ctx.strokeStyle = mousePos.settings.color;
      this.ctx.moveTo(mousePos.oldX, mousePos.oldY);
      this.ctx.lineTo(mousePos.newX, mousePos.newY);
      this.ctx.stroke();
      */
    if (drawData.length < 1) {
      return;
    }
    let p1 = drawData[0];
    let p2 = drawData[1];

    this.ctx.beginPath();
    this.ctx.moveTo(p1.x, p1.y);

    for (let i = 1, len = drawData.length; i < len; i++) {
      let midPoint = this.midPointBtw(p1, p2);
      this.ctx.lineCap = 'round';
      this.ctx.lineJoin = 'round';
      this.ctx.lineWidth = drawData[i].settings.size;
      this.ctx.shadowBlur = 2;
      this.ctx.shadowColor = drawData[i].settings.color;
      this.ctx.strokeStyle = drawData[i].settings.color;
      this.ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
      p1 = drawData[i];
      p2 = drawData[i + 1];
    }

    //this.ctx.lineTo(p1.x, p1.y);
    this.ctx.stroke();
  }

  midPointBtw(p1, p2) {
    return {
      x: p1.x + (p2.x - p1.x) / 2,
      y: p1.y + (p2.y - p1.y) / 2,
    };
  }

  saveImage() {
    this.canvas.nativeElement.setAttribute('download', 'image.png');
    window.open(
      this.canvas.nativeElement
        .toDataURL('image/png')
        .replace('image/png', 'image/octet-stream')
    );
    let gh = this.canvas.nativeElement.toDataURL('png');

    //this.download.nativeElement.href = gh;
    this.download.nativeElement.download = 'image.png';
  }
}

//ngAfterViewInit(): void {
//Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
//Add 'implements AfterViewInit' to the class.
//----let inputLineColor = document.getElementById('lineColor');
//this.lineColor = document.getElementById('lineColor').value;

//window.addEventListener('load', () => {
//   const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
//   const ctx = canvasEl.getContext('2d');

//   const resize = () => {
//     canvasEl.height = this.el.nativeElement.offsetHeight;
//     canvasEl.width = this.el.nativeElement.offsetWidth;
//   };
//   resize();

//   window.addEventListener('resize', resize);

//   let painting = false;

//   const startPosition = (e) => {
//     painting = true;
//     draw(e);
//   };
//   const finishPosition = () => {
//     painting = false;
//     ctx.beginPath();
//   };

//   const draw = (e) => {
//     if (!painting) return;
//     ctx.lineWidth = this.lineWidth;
//     ctx.strokeStyle = this.lineColor;
//     ctx.lineCap = 'round';

//     ctx.lineTo(e.clientX, e.clientY);
//     ctx.stroke();
//     ctx.beginPath();
//     ctx.moveTo(e.clientX, e.clientY);
//   };

//   canvasEl.addEventListener('mousedown', startPosition);
//   canvasEl.addEventListener('mouseup', finishPosition);
//   canvasEl.addEventListener('mousemove', draw);
//   inputLineColor.addEventListener(
//     'input',
//     () => {
//       ctx.strokeStyle = this.lineColor;
//     },
//     false
//   );
//   //});
// }
//}
