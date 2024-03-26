import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { DefaultInputComponent } from './default-input.component';


describe('DefaultInputComponent', () => {
  let spectator: Spectator<DefaultInputComponent>;
  const createComponent = createComponentFactory(DefaultInputComponent);

  beforeEach(() => spectator = createComponent());

  it('it should have ngZorro form components', () => {
    expect(spectator.query('nz-form-item')).toExist();
    expect(spectator.query('nz-form-label')).toExist();
    expect(spectator.query('nz-form-control')).toExist();
    expect(spectator.query('nz-input-group')).toExist();
    expect(spectator.query('input')).toHaveAttribute('nz-input');
  });

  it('should set input type correctly', () => {
    const inputType = 'password';
    spectator.setInput('type', inputType);

    const inputElement = spectator.query('input');
    expect(inputElement).toHaveAttribute('type', inputType);
  });

  it('should set autocomplete attribute correctly', () => {
    const autocompleteValue = 'off';
    spectator.setInput('autocomplete', autocompleteValue);

    const inputElement = spectator.query('input');
    expect(inputElement).toHaveAttribute('autocomplete', autocompleteValue);
  });

  it('should mark input as disabled when disabled is true', () => {  
    expect(spectator.component.disabled).toBeFalsy();
  
    spectator.component.disabled = true;

    spectator.detectComponentChanges();
  
    expect(spectator.component.disabled).toBeTruthy();
  });

  it('should not mark input as disabled when disabled is false', () => {
    spectator.component.disabled = false;

    spectator.detectComponentChanges();

    const inputElement = spectator.query('input');
    expect(inputElement).not.toBeDisabled();
  });

  it('it should have required class on label', () => {
    spectator.setInput('required', true);

    const labelElement = spectator.query('nz-form-label label');

    expect(labelElement).toExist();
    expect(labelElement).toHaveClass('ant-form-item-required');
  });

  it('it should render label text correctly', () => {
    const labelText = 'Test Label';

    spectator.setInput('label', labelText);

    const labelElement = spectator.query('.label');

    expect(labelElement).toExist();
    expect(labelElement).toHaveText(labelText);
  });

  it('it should wrap label', () => {
    spectator.setInput('labelWrap', true);

    const labelElement = spectator.query('nz-form-label');
    
    expect(labelElement).toExist();
    expect(labelElement).toHaveClass('ant-form-item-label-wrap');
  });

  it('should call setDisabledState method with true', () => {
    spyOn(spectator.component, 'setDisabledState');

    spectator.component.setDisabledState(true);

    expect(spectator.component.setDisabledState).toHaveBeenCalledWith(true);
  });

  it('should call setDisabledState method with false', () => {
    spyOn(spectator.component, 'setDisabledState');

    spectator.component.setDisabledState(false);

    expect(spectator.component.setDisabledState).toHaveBeenCalledWith(false);
  });
});