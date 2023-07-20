import styled from "styled-components";
import { colors } from "../styles";

const Tagger = styled.div`
  display: inline-block;

  background-color: ${colors.foreground};
  color: ${colors.foregroundAlt};

  font-size: 14px;
  font-weight: bold;

  padding: 4px 6px;
`;

type Props = {
  label: string;
};

const Tag = ({ label }: Props) => <Tagger>{label}</Tagger>;

export default Tag;
