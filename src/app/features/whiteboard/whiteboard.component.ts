import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Input,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'app-whiteboard',
  templateUrl: './whiteboard.component.html',
  styleUrls: ['./whiteboard.component.css'],
})
export class WhiteboardComponent implements OnInit {
  // lineColor = 'blue';
  // lineWidth = 5;
  @Input() canvasMeta: any;
  @ViewChild('canvas') public canvas: ElementRef;
  private _ctx: CanvasRenderingContext2D;
   _canvasWidth;
   _canvasHeight;
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

  clearCanvas() {
    this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
  }
  ngOnInit(): void {
    this._ctx = this.canvas.nativeElement.getContext('2d');
    this._ctx.canvas.width = this.canvasMeta.width;
    this._ctx.canvas.height = this.canvasMeta.height;
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
      this._mousePosition.settings.size = 5;
      this._mousePosition.settings.color = 'blue';

      this._canvasPoints.push({
        x:
          event.clientX -
          this.canvas.nativeElement.getBoundingClientRect().left,
        y:
          event.clientY - this.canvas.nativeElement.getBoundingClientRect().top,
        settings: { size: 5, color: 'blue' },
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
      this._ctx.beginPath();
      this._ctx.lineWidth = mousePos.settings.size;
          this._ctx.lineCap = 'round';
          this._ctx.lineJoin = 'round';
          this._ctx.shadowBlur = 2;
        this._ctx.shadowColor = mousePos.settings.color;
      this._ctx.strokeStyle = mousePos.settings.color;
      this._ctx.moveTo(mousePos.oldX, mousePos.oldY);
      this._ctx.lineTo(mousePos.newX, mousePos.newY);
      this._ctx.stroke();
      */
    if (drawData.length < 1) {
      return;
    }
    let p1 = drawData[0];
    let p2 = drawData[1];

    this._ctx.beginPath();
    this._ctx.moveTo(p1.x, p1.y);

    for (var i = 1, len = drawData.length; i < len; i++) {
      let midPoint = this.midPointBtw(p1, p2);
      this._ctx.lineCap = 'round';
      this._ctx.lineJoin = 'round';
      this._ctx.lineWidth = drawData[i].settings.size;
      this._ctx.shadowBlur = 2;
      this._ctx.shadowColor = drawData[i].settings.color;
      this._ctx.strokeStyle = drawData[i].settings.color;
      this._ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
      p1 = drawData[i];
      p2 = drawData[i + 1];
    }

    //this._ctx.lineTo(p1.x, p1.y);
    this._ctx.stroke();
  }

  midPointBtw(p1, p2) {
    return {
      x: p1.x + (p2.x - p1.x) / 2,
      y: p1.y + (p2.y - p1.y) / 2,
    };
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
