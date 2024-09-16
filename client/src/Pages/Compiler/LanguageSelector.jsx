import React from "react";
import { Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { LANGUAGE_VERSIONS } from "./constants";

  const languages = Object.entries(LANGUAGE_VERSIONS);
  const ACTIVE_COLOR = 'blue.500';

  

const LanguageSelector = ({language, onSelect, lightTheme}) => {
  return (
    <div className=" ml-2 mb-4">
      <p className={`mb-2 text-lg ${lightTheme?'text-gray-900':'text-gray-400'} font-normal`}>
        Language :
      </p>
      <Menu isLazy>
        <MenuButton as={Button}>
            {language}
        </MenuButton>
        <MenuList bg={`${lightTheme?'#f5f5f5':'#110c1b'}`}>
            {languages.map(([lang, version]) => (
                <MenuItem key={lang} onClick={()=>onSelect(lang)}
                    color={lang === language ? ACTIVE_COLOR : lightTheme?'gray.900':'gray.400'}
                    bg={
                        lang === language ? lightTheme?'gray.400':'gray.900' : ''
                    }
                    _hover={{
                        color: 'blue.400',
                        bg: `${lightTheme?'gray.200':'gray.800'}`
                    }}
                    fontSize={'md'}

                >
                    {lang}
                    &nbsp;
                    <span className="text-gray-600 text-sm">
                        {version}
                    </span>
                </MenuItem>
            ))}
        </MenuList>
      </Menu>
    </div>
  );
};

export default LanguageSelector;
