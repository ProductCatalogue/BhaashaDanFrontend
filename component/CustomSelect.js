import React, { useState, memo, useMemo,map,some } from 'react'
import { isEmpty, find } from 'lodash'
import { View, FlatList, Text, TouchableOpacity,  } from 'react-native'



const hitSlop = { top: 14, bottom: 14, left: 14, right: 14 }

const kOptionsHeight = { width: '100%', maxHeight: 120 }


const kOptionListViewStyle = {
  width: '100%',
  alignItems: 'center',
  paddingVertical: 0,
}
const renderItemStyle = { flexShrink: 1 }
function Toggle({ onTouch, checked, iconColor = Colors.primary, ...props }) {
  return (
    <TouchableOpacity onPress={onTouch} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} {...props}>
     <Text> {checked ? '-' : '+'}</Text>
    </TouchableOpacity>
  )
}
function SelectBox({
  labelStyle,
  containerStyle,
  inputFilterContainerStyle,
  inputFilterStyle,
  optionsLabelStyle,
  optionContainerStyle,
  multiOptionContainerStyle,
  multiOptionsLabelStyle,
  multiListEmptyLabelStyle,
  listEmptyLabelStyle,
  selectedItemStyle,
  listEmptyText = 'No results found',
  ...props
}) {
  const [inputValue, setInputValue] = useState('')

  const [showOptions, setShowOptions] = useState(false)

  function renderLabel(item) {
    const kOptionsLabelStyle = {
      fontSize: 12,
      color: 'rgba(60, 60, 67, 0.6)',
      ...optionsLabelStyle,
    }
    return <Text style={kOptionsLabelStyle}>{item}</Text>
  }

  function renderItem({ item }) {
    const { isMulti, onChange, onMultiSelect, selectedValues,onTapClose } = props
    //alert("selected value"+selectedValues);

    const kOptionContainerStyle = {
      borderColor: '#dadada',
      //borderRadius:5,
      //borderWidth:1,
      //borderBottomWidth: 1,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      background: '#9BEBCC',
      paddingVertical: 2,
      paddingRight: 0,
      justifyContent: 'space-between',
      ...optionContainerStyle,
    }
    const checked=selectedValues.some(i=>item.id === i.id);
    return (
      <View style={kOptionContainerStyle}>
        
          
        
        {isMulti ? (
          <>
            <TouchableOpacity hitSlop={hitSlop} style={renderItemStyle} onPress={onPressMultiItem(checked)}>
              {renderLabel(item.item)}
            </TouchableOpacity>
            <Toggle
              iconColor='#0ccb7c'
              checked={checked}
              onTouch={onPressMultiItem(checked)}
            />
          </>
        ) : (
          <>
            <TouchableOpacity hitSlop={hitSlop} style={renderItemStyle} onPress={onPressItem()}>
              {renderLabel(item.item)}
              <View />
            </TouchableOpacity>
          </>
        )}
      </View>
    )

    function onPressMultiItem(checked) {
      //alert(onMultiSelect);
      return (e) => (checked ?onTapClose(item)  : onMultiSelect(item))
    }

    function onPressItem() {
      return (e) => {
        setShowOptions(false)
        return onChange ? onChange(item) : null
      }
    }
  }

  function renderGroupItem({ item }) {
    const { onTapClose, options } = props
    const label = find(options, (o) => o.id === item.id)
    //const label =  item.item
    const kMultiOptionContainerStyle = {
      flexDirection: 'row',
      borderRadius: 20,
      paddingVertical: 1,
      paddingRight: 5,
      paddingLeft: 4,
      marginRight: 4,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#0ccb7c',
      //flexGrow: ''
      
      //alignself:'center',
      //flexShrink:''
      ...multiOptionContainerStyle,
    }
    const kMultiOptionsLabelStyle = {
      fontSize: 10,
      color: '#fff',
      ...multiOptionsLabelStyle,
    }
    return (
      <View style={kMultiOptionContainerStyle}>
        <TouchableOpacity style={{ marginLeft: 2 }} hitSlop={hitSlop} onPress={onPressItem()}>
        <Text style={kMultiOptionsLabelStyle}>{label.item} -</Text>
        </TouchableOpacity>
      </View>
    )

    function onPressItem() {
      return (e) => (onTapClose ? onTapClose(item) : null)
    }
  }
  const {
    selectIcon,
    label,
    
    inputPlaceholder = props.inputPlaceholder,
    hideInputFilter,
    width = '100%',
    isMulti,
    options,
    value,
    selectedValues=[],
    arrowIconColor = '#0ccb7c',
    searchIconColor = '#0ccb7c',
    toggleIconColor = '#0ccb7c',
    searchInputProps,
    multiSelectInputFieldProps,
    listOptionProps = {},
  } = props
  const filteredSuggestions = useMemo(
    () => options.filter((suggestion) => suggestion.item.toLowerCase().indexOf(inputValue.toLowerCase()) > -1),
    [inputValue, options]
  )

  function multiListEmptyComponent() {
    const kMultiListEmptyLabelStyle = {
      fontSize: 14,
      color: 'grey',
      ...multiListEmptyLabelStyle,
    }
    return (
      <TouchableOpacity
        width="100%"
        style={{ flexGrow: 1, width: '100%' }}
        hitSlop={hitSlop}
        onPress={onPressShowOptions()}>
        <Text style={kMultiListEmptyLabelStyle}>{inputPlaceholder}</Text>
        
      </TouchableOpacity>
    )
  }

  function optionListEmpty() {
    const kListEmptyLabelStyle = {
      fontSize: 17,
      color: 'rgba(60, 60, 67, 0.6)',
      ...listEmptyLabelStyle,
    }
    return (
      <View style={kOptionListViewStyle}>
        <Text style={kListEmptyLabelStyle}>{listEmptyText}</Text>
      </View>
    )
  }
  const kLabelStyle = {
    fontSize: 10,
    //color: 'rgba(60, 60, 67, 0.6)',
    color:'black',
    paddingBottom: 4,
    ...labelStyle,
    borderWidth:0,
    top:-8,
    left:10,
    position:'absolute',
    background:'#9BEBCC',
    
  }

  const kContainerStyle = {
    flexDirection: 'row',
    width: '100%',
    borderColor: '#ddd',
    //borderBottomWidth: 1,
    paddingTop: 6,
    paddingRight: 20,
    paddingBottom: 8,
    ...containerStyle,
  }
  const labelContainer= {
   
    position: 'relative',
    top:12,
    left:5,
    paddingHorizontal: 0,
    backgroundColor: '#9BEBCC',
    borderWidth:1,
    borderRadius:5,
    borderColor:'#0ccb7c',
    
  }

  return (
    <View>
   
   
   <TouchableOpacity onPress={onPressShowOptions()} hitSlop={hitSlop}>      
        <View style={kContainerStyle}>
        
          <View style={{ paddingRight:2}}>
            {isMulti ? (
              <view>
                 
              <FlatList
              contentContainerStyle={{flexDirection:'row'}}
                data={selectedValues}
                extraData={{ inputValue, showOptions }}
                keyExtractor={keyExtractor()}
                renderItem={renderGroupItem}
                
                ListEmptyComponent={multiListEmptyComponent}
                {...multiSelectInputFieldProps}
              />
              
              
              </view>
            ) : (
              <TouchableOpacity hitSlop={hitSlop} onPress={onPressShowOptions}>
                <Text style={kSelectedItemStyle()}>{value.item || inputPlaceholder || label}</Text>
              </TouchableOpacity>
            )}
          </View>
          
        </View>
        {/* Options wrapper */}
        {showOptions && (
          <FlatList
            data={filteredSuggestions || options}
            extraData={options}
            keyExtractor={keyExtractor()}
            renderItem={renderItem}
            numColumns={1}
            horizontal={false}
            initialNumToRender={5}
            maxToRenderPerBatch={20}
            windowSize={10}
            ListEmptyComponent={optionListEmpty}
            style={[kOptionsHeight, listOptionProps.style]}
            ListHeaderComponent={HeaderComponent()}
            {...listOptionProps}
          />
        )}
      </TouchableOpacity>
    </View>
  )

  function keyExtractor() {
    return (o) => `${o.id}-${Math.random()}`
  }

  function kSelectedItemStyle() {
    return {
      fontSize: 12,
      color: isEmpty(value.item) ? 'rgba(60, 60, 67, 0.3)' : '#000',
      ...selectedItemStyle,
    }
  }

  function HeaderComponent() {
    const kInputFilterContainerStyle = {
      width: '100%',
      //borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      flexDirection: 'row',
      alignItems: 'center',
      paddingRight: 0,
      justifyContent: 'space-between',
      ...inputFilterContainerStyle,
    }
    const kInputFilterStyle = {
      paddingVertical: 4,
      paddingRight: 0,
      color: '#000',
      fontSize: 12,
      flexGrow: 1,
      ...inputFilterStyle,
    }
    
    return (
      <>
        {!hideInputFilter && (
          <View style={kInputFilterContainerStyle}>
  
          </View>
        )}
        
      </>
    )

    function onChangeText() {
      return (value) => setInputValue(value)
    }
  }

  function onPressShowOptions() {
    return () => setShowOptions(!showOptions)
  }
}

SelectBox.defaultProps = {
  label: 'Label',
  options: [
    {
      item: 'Aston Villa FC',
      id: 'AVL',
    },
    {
      item: 'West Ham United FC',
      id: 'WHU',
    },
    {
      item: 'Stoke City FC',
      id: 'STK',
    },
    {
      item: 'Sunderland AFC',
      id: 'SUN',
    },
    {
      item: 'Everton FC',
      id: 'EVE',
    },
    {
      item: 'Tottenham Hotspur FC',
      id: 'TOT',
    },
    {
      item: 'Manchester City FC',
      id: 'MCI',
    },
    {
      item: 'Chelsea FC',
      id: 'CHE',
    },
    {
      item: 'West Bromwich Albion FC',
      id: 'WBA',
    },
    {
      item: 'Liverpool FC',
      id: 'LIV',
    },
    {
      item: 'Arsenal FC',
      id: 'ARS',
    },
    {
      item: 'Manchester United FC',
      id: 'MUN',
    },
    {
      item: 'Newcastle United FC',
      id: 'NEW',
    },
    {
      item: 'Norwich City FC',
      id: 'NOR',
    },
    {
      item: 'Watford FC',
      id: 'WAT',
    },
    {
      item: 'Swansea City FC',
      id: 'SWA',
    },
    {
      item: 'Crystal Palace FC',
      id: 'CRY',
    },
    {
      item: 'Leicester City FC',
      id: 'LEI',
    },
    {
      item: 'Southampton FC',
      id: 'SOU',
    },
    {
      item: 'AFC Bournemouth',
      id: 'BOU',
    },
  ],
}

export default memo(SelectBox)