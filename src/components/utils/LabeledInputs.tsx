import { Row } from "../../utils/chakra";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Box,
  BoxProps,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Select,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Textarea,
  NumberInput,
  NumberInputField,
  Flex
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export function LabeledSlider({
  label,
  value,
  setValue,
  color,
  max,
  min,
  step,
  ...others
}: {
  label: string;
  value: number;
  setValue: (value: number) => void;
  color: string;
  max: number;
  min: number;
  step: number;
  } & BoxProps) {
  
    const handleValueChange = (v: string) => {
      const numericValue = Number(v);
      if (!isNaN(numericValue) || v[1] == '.') {
        setValue(v); // Currently, I haven't been able to get this to both give a valid type for temperature (number) and be able to type periods.
        // To fix this, I'm just gonna change it so that the program attempts to convert the temperature value its given to a number when it makes the API Call
        // If anyone has a better idea of how to do this, please fix it lmao, I can't imagine this is the right/best way
      }
    };
  
  return (
    <Box {...others}>
      <Flex align='center' justify-width='stretch'>
        <Box>
        <b>{label}: {}</b> 
        </Box>
        <NumberInput 
          mx = '2'
          maxW = '100px'
          mr='1rem'
          step={0.01}
          precision={2}
          onChange={handleValueChange}
          value={value}
          max={max}
          min={min}
        >
            <NumberInputField />
        </NumberInput>
      </Flex>
      <Slider
          mx="2px"
          aria-label="temp-slider"
          value={value}
          onChange={(v: number) => setValue(v)}
          max={max}
          min={min}
          step={step}
          focusThumbOnChange={false}
        >
          <SliderTrack>
            <SliderFilledTrack bg={color} />
          </SliderTrack>

          <SliderThumb />
        </Slider>
    </Box>
  );
}

export function LabeledInput({
  label,
  value,
  setValue,
  ...others
}: {
  label: string;
  value: string;
  setValue: (value: string) => void;
} & BoxProps) {
  return (
    <Box {...others}>
      <b>{label}:</b>
      <Input mt={1} onChange={(e) => setValue(e.target.value)} value={value} />
    </Box>
  );
}

export function LabeledPasswordInputWithLink({
  label,
  linkLabel,
  placeholder,
  link,
  value,
  setValue,
  ...others
}: {
  label: string;
  linkLabel: string;
  placeholder?: string;
  link: string;
  value: string;
  setValue: (value: string) => void;
} & BoxProps) {
  const [show, setShow] = useState(false);

  return (
    <Box {...others}>
      <Row mainAxisAlignment="space-between" crossAxisAlignment="center">
        <b>{label}:</b>
        <Link
          _focus={{ boxShadow: "none" }}
          href={link}
          isExternal
          fontSize="sm"
          color="green"
        >
          {linkLabel}
          <ExternalLinkIcon ml="5px" mb="3px" />
        </Link>
      </Row>
      <InputGroup size="md" borderBottom="0px" borderColor="#EEF2F6" mt={1}>
        <Input
          type={show ? "text" : "password"}
          value={value}
          placeholder={placeholder}
          onChange={(e) => setValue(e.target.value)}
        />
        <InputRightElement width="auto">
          <Button
            width="55px"
            h="1.75rem"
            size="sm"
            bgColor="#EEEEEE"
            mr="6px"
            onClick={() => setShow(!show)}
          >
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
    </Box>
  );
}

export function LabeledTextArea({
  label,
  value,
  setValue,
  textAreaId,
  ...others
}: {
  label: string;
  value: string;
  textAreaId: string | undefined;
  setValue: (value: string) => void;
} & BoxProps) {
  return (
    <Box {...others} whiteSpace="pre-wrap">
      <b>{label}:</b>
      <Textarea
        mt={3}
        height="150px"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        id={textAreaId}
        placeholder="Enter text here..."
      />
    </Box>
  );
}

export function SelfSelectingLabeledTextArea({
  label,
  value,
  setValue,
  id,
  ...others
}: {
  label: string;
  value: string;
  id: string;
  setValue: (value: string) => void;
} & BoxProps) {
  useEffect(
    () => (window.document.getElementById(id) as HTMLTextAreaElement | null)?.select(),
    []
  );

  return (
    <LabeledTextArea
      {...others}
      label={label}
      value={value}
      setValue={setValue}
      textAreaId={id}
    />
  );
}

export function LabeledSelect({
  label,
  value,
  setValue,
  options,
  ...others
}: {
  label: string;
  value: string;
  options: string[];
  setValue: (value: string) => void;
} & BoxProps) {
  return (
    <Box {...others}>
      <b>{label}:</b>
      <Select mt={2} onChange={(e) => setValue(e.target.value)} value={value}>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </Select>
    </Box>
  );
}
