import { MagnifyingGlass } from 'react-loader-spinner';
import { LoaderDiv } from './Loader.styled';

export const Loader = () => {
  return (
    <LoaderDiv>
      <MagnifyingGlass
        visible={true}
        height="80"
        width="80"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{}}
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="#c0efff"
        color="#e15b64"
      />
    </LoaderDiv>
  );
};