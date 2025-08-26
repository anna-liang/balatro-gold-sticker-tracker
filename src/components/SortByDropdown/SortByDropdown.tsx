import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { SortOptions } from '../../types';
import styles from './SortByDropdown.module.css';

function SortByDropdown({
  handleSortBy,
  selectedOption,
}: {
  handleSortBy: (option: SortOptions) => void;
  selectedOption: SortOptions;
}) {
  return (
    <div className={styles.menu}>
      <Menu>
        <MenuButton className={styles.menuButton}>{selectedOption}</MenuButton>
        <MenuItems>
          {Object.keys(SortOptions).map((option, i) => {
            const optionName = SortOptions[option as keyof typeof SortOptions];
            return (
              <MenuItem key={option}>
                <div
                  style={{
                    borderTopLeftRadius: i === 0 ? '4px' : '0px',
                    borderTopRightRadius: i === 0 ? '4px' : '0px',
                    borderBottomLeftRadius:
                      i === Object.keys(SortOptions).length - 1 ? '4px' : '0px',
                    borderBottomRightRadius:
                      i === Object.keys(SortOptions).length - 1 ? '4px' : '0px',
                  }}
                  className={styles.menuItem}
                  onClick={() => {
                    handleSortBy(optionName);
                  }}
                >
                  {optionName}
                </div>
              </MenuItem>
            );
          })}
        </MenuItems>
      </Menu>
    </div>
  );
}

export default SortByDropdown;
