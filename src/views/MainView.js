import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import AsyncSearchBar from "../components/atoms/AsyncSearchBar";
import LeftNav from "../components/LeftNav/LeftNav";
import { getWeather } from "../redux/actions/weatherActions";
import WeatherView from "./WeatherView";

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.gradient.background};
  width: 100%;
  min-height: 100vh;
  padding: 3rem;
`;

const StyledSearchAndTitleContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  magin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5rem;
`;

const StyledHeader = styled.h2`
  text-align: center;
  color: var(--default);
`;

const StyledContent = styled(motion.div)`
  display: flex;
  width: 100%;
  height: 100%;

  @media (max-width: 800px) {
    flex-wrap: wrap;
  }
`;

const StyledSearchContainer = styled.div`
  width: 50%;
  position: relative;
  transform: ${({ isMiddlePosition }) => isMiddlePosition ? 'translateY(35vh)' : 'translateY(0%)'};
  transition: all 0.5s ease;
  transition-delay: ${({ isMiddlePosition }) => isMiddlePosition ? '0.5s' : '0s'};
`;

const MainView = () => {
  const dispatch = useDispatch();
  const { selectedLocation } = useSelector(({ weather }) => ({
    selectedLocation: weather.selectedLocation,
  }));

  useEffect(() => {
    if (selectedLocation) {
      dispatch(getWeather());
    }
  }, [selectedLocation]);

  return (
    <StyledWrapper>
      <StyledSearchAndTitleContainer>
        <StyledHeader>
          Open Weather Map
        </StyledHeader>
        <StyledSearchContainer isMiddlePosition={!selectedLocation}>
          <AsyncSearchBar />
        </StyledSearchContainer>
      </StyledSearchAndTitleContainer>
      <AnimatePresence initial={false}>
        {selectedLocation && (
          <StyledContent
            key="modal"
            initial={{
              opacity: 0,
              scaleX: 0,
            }}
            animate={{
              ease: "ease",
              opacity: 1,
              scaleX: 1,
              transition: {
                delay: 0.2,
                duration: 0.5,
              },
            }}
            exit={{
              ease: "ease",
              opacity: 0,
              scaleX: 0,
              transition: {
                duration: 0.5,
              },
            }}
          >
            <StyledContent>
              <LeftNav />
              <WeatherView />
            </StyledContent>
          </StyledContent>
        )}
      </AnimatePresence>
    </StyledWrapper>
  );
};

export default MainView;
