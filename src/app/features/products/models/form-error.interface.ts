
export interface FormError {
    errorKey: string;
    message: string;
  }
  
  export const PRODUCT_FORM_ERRORS: Record<string, FormError[]> = {
    id: [
      { errorKey: 'required', message: 'ID es requerido' },
      { errorKey: 'minlength', message: 'Mínimo 3 caracteres' },
      { errorKey: 'maxlength', message: 'Máximo 10 caracteres' },
      { errorKey: 'idExists', message: 'Este ID ya existe' }
    ],
    name: [
      { errorKey: 'required', message: 'Nombre es requerido' },
      { errorKey: 'minlength', message: 'Mínimo 5 caracteres' },
      { errorKey: 'maxlength', message: 'Máximo 100 caracteres' }
    ],
    description: [
      { errorKey: 'required', message: 'Descripción es requerida' },
      { errorKey: 'minlength', message: 'Mínimo 10 caracteres' },
      { errorKey: 'maxlength', message: 'Máximo 200 caracteres' }
    ],
    logo: [
      { errorKey: 'required', message: 'Logo es requerido' }
    ],
    date_release: [
      { errorKey: 'required', message: 'Fecha de liberación es requerida' },
      { errorKey: 'dateInvalid', message: 'La fecha debe ser igual o mayor a la actual' }
    ],
    date_revision: [
      { errorKey: 'required', message: 'Fecha de revisión es requerida' },
      { errorKey: 'oneYearAfter', message: 'Debe ser exactamente un año después de la fecha de liberación' }
    ]
  };