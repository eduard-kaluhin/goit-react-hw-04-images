import styled from '@emotion/styled';

export const Overlay=styled.div`
position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
`

  export const ModalDiv = styled.div`
  max-width: calc(100% - 48px);
  max-height: calc(100% - 24px);
  `