import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-color-background',
  standalone: true,
  imports: [],
  templateUrl: './color-background.component.html',
  styleUrl: './color-background.component.css',
})
export class ColorBackgroundComponent {
  @Input() value: number = 0;
  @Input() minValue: number = 0;
  @Input() maxValue: number = 100;
  @Input() minColor: string = '#EBE9AF'; // Red
  @Input() maxColor: string = '#F9D6B0'; // Green

  backgroundColor: string = '#657D3C';

  ngOnChanges(): void {
    this.backgroundColor = this.getColorForValue(
      this.value,
      this.minValue,
      this.maxValue,
      this.minColor,
      this.maxColor
    );
  }

  getColorForValue(
    value: number,
    minValue: number,
    maxValue: number,
    minColor: string,
    maxColor: string
  ): string {
    if (minValue === maxValue) {
      return minColor;
    }

    const percent = (value - minValue) / (maxValue - minValue);
    const startColor = this.hexToRgb(minColor);
    const endColor = this.hexToRgb(maxColor);

    const r = Math.round(startColor.r + percent * (endColor.r - startColor.r));
    const g = Math.round(startColor.g + percent * (endColor.g - startColor.g));
    const b = Math.round(startColor.b + percent * (endColor.b - startColor.b));

    return `rgb(${r}, ${g}, ${b})`;
  }

  hexToRgb(hex: string): { r: number; g: number; b: number } {
    let result: any = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  }
}
