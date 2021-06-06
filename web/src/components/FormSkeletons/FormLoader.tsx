import React from 'react';
import Skeleton from '@Common/Skeleton';
import { FormRow } from '@Globals/index';
import { Body } from '@Components/Modal/style';

function FormLoader() {
  return (
    <>
      <Body aria-disabled="true" aria-label="Loading">
        <FormRow>
          <Skeleton height="36px" width="100%" />
        </FormRow>
        <FormRow>
          <Skeleton height="36px" width="100%" />
        </FormRow>
        <FormRow>
          <Skeleton height="36px" width="100%" />
        </FormRow>
        <FormRow>
          <Skeleton height="36px" width="100%" />
        </FormRow>
        <FormRow>
          <Skeleton height="36px" width="100%" />
        </FormRow>
        <FormRow>
          <Skeleton height="36px" width="100%" />
        </FormRow>
        <FormRow>
          <Skeleton height="36px" width="100%" />
        </FormRow>
      </Body>
    </>
  );
}

export default FormLoader;
