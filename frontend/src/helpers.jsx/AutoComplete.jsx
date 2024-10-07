import * as React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { CreateCategory } from "../apiCalls/Category";
import { useDispatch, useSelector } from "react-redux";
import { SetCategory } from "../Redux/CategorySlice";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export default function FreeSoloCreateOptionDialog() {
  const filter = createFilterOptions();
  const cate = useSelector((state) => state.category.category);
  const products = useSelector((state) => state.products.products);
  console.log(products, "Test1");
  console.log(cate, "Test2");
  const [categorys, setCategorys] = React.useState(cate);
  let dispatch = useDispatch();
  const mode = useSelector((state) => state.mode.mode);
  const [value, setValue] = React.useState(null);
  const [open, toggleOpen] = React.useState(false);
  const [dialogValue, setDialogValue] = React.useState({ name: "" });

  const handleClose = () => {
    setDialogValue({ name: "" });
    toggleOpen(false);
  };

  // React.useEffect(() => {
  //   dispatch(SetCategory(value));
  //   console.log(value);
  // }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Add the new value to the existing categories
    console.log(dialogValue);
    const response = await CreateCategory(dialogValue);

    setCategorys([
      ...categorys,
      { _id: response.data.data._id, name: dialogValue.name },
    ]);
    setValue({ _id: response.data.data._id, name: dialogValue.name });
    handleClose();
  };
  // Create theme based on user preference
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <React.Fragment>
        <Autocomplete
          value={value}
          onChange={(event, newValue) => {
            if (typeof newValue === "string") {
              // timeout to avoid instant validation of the dialog's form.
              setTimeout(() => {
                toggleOpen(true);
                setDialogValue({ name: newValue });
              });
            } else if (newValue && newValue.inputValue) {
              toggleOpen(true);
              setDialogValue({ name: newValue.inputValue });
            } else {
              setValue(newValue);
            }
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);
            if (params.inputValue !== "") {
              filtered.push({
                inputValue: params.inputValue,
                name: `Add "${params.inputValue}"`,
              });
            }
            return filtered;
          }}
          id="free-solo-dialog-demo"
          options={categorys}
          getOptionLabel={(option) => {
            if (typeof option === "string") {
              return option;
            }
            if (option.inputValue) {
              return option.inputValue;
            }
            return option.name;
          }}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          renderOption={(props, option) => <li {...props}>{option.name}</li>}
          sx={{ width: 300 }}
          freeSolo
          renderInput={(params) => (
            <TextField {...params} label="Select Category" />
          )}
        />
        <Dialog open={open} onClose={handleClose}>
          <form onSubmit={handleSubmit}>
            <DialogTitle>Add a New Category</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Did you miss any Category in our list? Please, add it!
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                value={dialogValue.name}
                onChange={(event) =>
                  setDialogValue({
                    ...dialogValue,
                    name: event.target.value,
                  })
                }
                label="Category Name"
                type="text"
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Add</Button>
            </DialogActions>
          </form>
        </Dialog>
      </React.Fragment>
    </ThemeProvider>
  );
}

// const top100Films = [
//   { name: "The Shawshank Redemption", year: 1994 },
//   { name: "The Godfather", year: 1972 },
//   { name: "The Godfather: Part II", year: 1974 },
//   { name: "The Dark Knight", year: 2008 },
//   { name: "12 Angry Men", year: 1957 },
//   { name: "Schindler's List", year: 1993 },
//   { name: "Pulp Fiction", year: 1994 },
//   {
//     name: "The Lord of the Rings: The Return of the King",
//     year: 2003,
//   },
//   { name: "The Good, the Bad and the Ugly", year: 1966 },
//   { name: "Fight Club", year: 1999 },
//   {
//     name: "The Lord of the Rings: The Fellowship of the Ring",
//     year: 2001,
//   },
//   {
//     name: "Star Wars: Episode V - The Empire Strikes Back",
//     year: 1980,
//   },
//   { name: "Forrest Gump", year: 1994 },
//   { name: "Inception", year: 2010 },
//   {
//     name: "The Lord of the Rings: The Two Towers",
//     year: 2002,
//   },
//   { name: "One Flew Over the Cuckoo's Nest", year: 1975 },
//   { name: "Goodfellas", year: 1990 },
//   { name: "The Matrix", year: 1999 },
//   { name: "Seven Samurai", year: 1954 },
//   {
//     name: "Star Wars: Episode IV - A New Hope",
//     year: 1977,
//   },
//   { name: "City of God", year: 2002 },
//   { name: "Se7en", year: 1995 },
//   { name: "The Silence of the Lambs", year: 1991 },
//   { name: "It's a Wonderful Life", year: 1946 },
//   { name: "Life Is Beautiful", year: 1997 },
//   { name: "The Usual Suspects", year: 1995 },
//   { name: "Léon: The Professional", year: 1994 },
//   { name: "Spirited Away", year: 2001 },
//   { name: "Saving Private Ryan", year: 1998 },
//   { name: "Once Upon a Time in the West", year: 1968 },
//   { name: "American History X", year: 1998 },
//   { name: "Interstellar", year: 2014 },
//   { name: "Casablanca", year: 1942 },
//   { name: "City Lights", year: 1931 },
//   { name: "Psycho", year: 1960 },
//   { name: "The Green Mile", year: 1999 },
//   { name: "The Intouchables", year: 2011 },
//   { name: "Modern Times", year: 1936 },
//   { name: "Raiders of the Lost Ark", year: 1981 },
//   { name: "Rear Window", year: 1954 },
//   { name: "The Pianist", year: 2002 },
//   { name: "The Departed", year: 2006 },
//   { name: "Terminator 2: Judgment Day", year: 1991 },
//   { name: "Back to the Future", year: 1985 },
//   { name: "Whiplash", year: 2014 },
//   { name: "Gladiator", year: 2000 },
//   { name: "Memento", year: 2000 },
//   { name: "The Prestige", year: 2006 },
//   { name: "The Lion King", year: 1994 },
//   { name: "Apocalypse Now", year: 1979 },
//   { name: "Alien", year: 1979 },
//   { name: "Sunset Boulevard", year: 1950 },
//   {
//     name: "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
//     year: 1964,
//   },
//   { name: "The Great Dictator", year: 1940 },
//   { name: "Cinema Paradiso", year: 1988 },
//   { name: "The Lives of Others", year: 2006 },
//   { name: "Grave of the Fireflies", year: 1988 },
//   { name: "Paths of Glory", year: 1957 },
//   { name: "Django Unchained", year: 2012 },
//   { name: "The Shining", year: 1980 },
//   { name: "WALL·E", year: 2008 },
//   { name: "American Beauty", year: 1999 },
//   { name: "The Dark Knight Rises", year: 2012 },
//   { name: "Princess Mononoke", year: 1997 },
//   { name: "Aliens", year: 1986 },
//   { name: "Oldboy", year: 2003 },
//   { name: "Once Upon a Time in America", year: 1984 },
//   { name: "Witness for the Prosecution", year: 1957 },
//   { name: "Das Boot", year: 1981 },
//   { name: "Citizen Kane", year: 1941 },
//   { name: "North by Northwest", year: 1959 },
//   { name: "Vertigo", year: 1958 },
//   {
//     name: "Star Wars: Episode VI - Return of the Jedi",
//     year: 1983,
//   },
//   { name: "Reservoir Dogs", year: 1992 },
//   { name: "Braveheart", year: 1995 },
//   { name: "M", year: 1931 },
//   { name: "Requiem for a Dream", year: 2000 },
//   { name: "Amélie", year: 2001 },
//   { name: "A Clockwork Orange", year: 1971 },
//   { name: "Like Stars on Earth", year: 2007 },
//   { name: "Taxi Driver", year: 1976 },
//   { name: "Lawrence of Arabia", year: 1962 },
//   { name: "Double Indemnity", year: 1944 },
//   {
//     name: "Eternal Sunshine of the Spotless Mind",
//     year: 2004,
//   },
//   { name: "Amadeus", year: 1984 },
//   { name: "To Kill a Mockingbird", year: 1962 },
//   { name: "Toy Story 3", year: 2010 },
//   { name: "Logan", year: 2017 },
//   { name: "Full Metal Jacket", year: 1987 },
//   { name: "Dangal", year: 2016 },
//   { name: "The Sting", year: 1973 },
//   { name: "2001: A Space Odyssey", year: 1968 },
//   { name: "Singin' in the Rain", year: 1952 },
//   { name: "Toy Story", year: 1995 },
//   { name: "Bicycle Thieves", year: 1948 },
//   { name: "The Kid", year: 1921 },
//   { name: "Inglourious Basterds", year: 2009 },
//   { name: "Snatch", year: 2000 },
//   { name: "3 Idiots", year: 2009 },
//   { name: "Monty Python and the Holy Grail", year: 1975 },
// ];
