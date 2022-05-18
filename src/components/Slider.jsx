import styled from '@emotion/styled'
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
`
const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  //position arrows to the middle in the container
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;

  left: ${props => props.direction === 'left' && '10px'};
  right: ${props => props.direction === 'right' && '10px'};
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`
const Wrapper = styled.div`
  height: 100%;
  display: flex;
`

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: ${props=>props.bg};
`
const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
`
const Image = styled.img`
height: 80%;
`
const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`
const Title = styled.h1`
  font-size: 70px;
`
const Desc = styled.p`
margin: 50px 0;
font-size: 20px;
font-weight: 200;
letter-spacing: 1px;
`
const Button = styled.button`
padding: 10px;
font-size: 20px;
background-color: transparent;
cursor: pointer;
`



const Slider = () => {
  const handleClick = (direction) =>{

  }

  return (
    <Container>
      <Arrow direction='left' onClick={()=>handleClick('left')}>
        <ArrowLeftOutlinedIcon />
      </Arrow>
      <Wrapper>
      {/* Slide items */}
        <Slide bg='f5fafd'>
          <ImgContainer>
            <Image />
          </ImgContainer>
          <InfoContainer>
            <Title>SUMMER SALE</Title>
            <Desc>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</Desc>
            <Button>SHOW NOW</Button>
          </InfoContainer>
        </Slide>

        <Slide bg='f5f1ed'>
          <ImgContainer>
            <Image />
          </ImgContainer>
          <InfoContainer>
            <Title>WINTER SALE</Title>
            <Desc>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</Desc>
            <Button>SHOW NOW</Button>
          </InfoContainer>
        </Slide>

        <Slide bg='fbf0f4'>
          <ImgContainer>
            <Image />
          </ImgContainer>
          <InfoContainer>
            <Title>POPULAR SALE</Title>
            <Desc>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</Desc>
            <Button>SHOW NOW</Button>
          </InfoContainer>
        </Slide>

      </Wrapper>
      <Arrow direction='right' onClick={()=>handleClick('right')}>
        <ArrowRightOutlinedIcon />
      </Arrow>
    </Container>
  )
}

export default Slider
