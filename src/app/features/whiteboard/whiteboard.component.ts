import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-whiteboard',
  templateUrl: './whiteboard.component.html',
  styleUrls: ['./whiteboard.component.css'],
})
export class WhiteboardComponent implements OnInit, AfterViewInit {
  lineColor = 'blue';
  @ViewChild('canvas') public canvas: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    let inputLineColor = document.getElementById('lineColor');
    //this.lineColor = document.getElementById('lineColor').value;

    window.addEventListener('load', () => {
      const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
      const ctx = canvasEl.getContext('2d');

      const resize = () => {
        canvasEl.height = window.innerHeight;
        canvasEl.width = window.innerWidth;
      };
      resize();

      window.addEventListener('resize', resize);

      let painting = false;

      const startPosition = (e) => {
        painting = true;
        draw(e);
      };
      const finishPosition = () => {
        painting = false;
        ctx.beginPath();
      };

      const draw = (e) => {
        if (!painting) return;
        ctx.lineWidth = 5;
        ctx.strokeStyle = this.lineColor;
        ctx.lineCap = 'round';

        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
      };

      canvasEl.addEventListener('mousedown', startPosition);
      canvasEl.addEventListener('mouseup', finishPosition);
      canvasEl.addEventListener('mousemove', draw);
      inputLineColor.addEventListener(
        'input',
        () => {
          ctx.strokeStyle = this.lineColor;
        },
        false
      );
    });
  }
}
