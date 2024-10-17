import { useEffect, useState } from 'react';
import LiferayService from '../services/liferay';
import Select from './Select';
import { findObjectById, getNumberOfBigDecimalFields, isInEditMode, objectIsNotEmpty } from '../services/utils';
import Loading from './Loading';
import Map from './Map';
import ConfigurationHelper from './ConfigurationHelper';

function App(props) {
  const { objectDefinitionId, objectDefinitionERC, hideConfigHelper } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [objectDefinitions, setObjectDefinitions] = useState([]);
  const [objectDefinition, setObjectDefinition] = useState({});

  const handleSelectChange = (e) => {
    e.preventDefault();
    const objectDefinitionId = parseInt(e.target.value);
    const objectDefinition = findObjectById(objectDefinitionId, objectDefinitions);
    setObjectDefinition(objectDefinition);
  }

  useEffect(() => {
    if (objectDefinitionId) {
      const fetchData = async () => {
        const response = await LiferayService.get(`/o/object-admin/v1.0/object-definitions/${objectDefinitionId}`);
        setObjectDefinition(response);
        setIsLoading(false);
      };
      fetchData();
    } else if (objectDefinitionERC) {
      const fetchData = async () => {
        const response = await LiferayService.get(`/o/object-admin/v1.0/object-definitions/by-external-reference-code/${objectDefinitionERC}`);
        setObjectDefinition(response);
        setIsLoading(false);
      };
      fetchData();
    } else {
      const fetchData = async () => {
        const response = await LiferayService.get(`/o/object-admin/v1.0/object-definitions`);
        const items = response.items.filter((object) => {
          return getNumberOfBigDecimalFields(object) >= 2 && !object.system
        });
        setObjectDefinitions(items);
        setIsLoading(false);
      };
      fetchData();
    }
  }, [objectDefinitionId, objectDefinitionERC]);

  return (
    <div>
      {isInEditMode() && !JSON.parse(hideConfigHelper) &&
        <ConfigurationHelper />
      }
      {isLoading &&
        <Loading size="md" />
      }
      {!isLoading && objectDefinitions && objectDefinitions.length > 0 &&
        <Select items={objectDefinitions} onChangeHandler={handleSelectChange} />
      }
      {!isLoading && objectIsNotEmpty(objectDefinition) &&
        <h1>{objectDefinition.pluralLabel[objectDefinition.defaultLanguageId]}</h1>
      }
      {!isLoading && objectIsNotEmpty(objectDefinition) &&
        <Map objectDefinition={objectDefinition} {...props} />
      }
    </div>
  );
}

export default App;
