import {
    Button,
    CardHeader,
    Grid,
    InputAdornment,
    TextField,
    Typography,
    Card,
    CircularProgress,
    IconButton,
    CardMedia,
    CardContent,
    CardActions,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { red } from "@material-ui/core/colors";
import { getRecipe } from "./actions/RecipeActions";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: "56.25%", // 16:9
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: "rotate(180deg)",
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function App() {
    const classes = useStyles();

    const [search, setSearch] = useState("");
    const dispatch = useDispatch();

    const { loading, recipes } = useSelector((state) => state.recipe);
    const handleSubmit = () => {
        dispatch(getRecipe(search));
    };

    return (
        <Grid container={true} justifyContent="center">
            <Grid container={true} item={true} justifyContent="center" xs={9}>
                <Grid
                    container={true}
                    item={true}
                    lg={4}
                    md={6}
                    sm={6}
                    justifyContent="center"
                    style={{ paddingTop: 30 }}
                >
                    <Grid container={true} justifyContent="center">
                        <TextField
                            label="Search a food you want to know..."
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                            fullWidth
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </Grid>
                    <Grid
                        container={true}
                        justifyContent="center"
                        style={{ paddingTop: 10 }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            href="#contained-buttons"
                            fullWidth
                            onClick={handleSubmit}
                        >
                            Search
                        </Button>
                    </Grid>
                </Grid>
                <Grid
                    container={true}
                    style={{ marginTop: 50 }}
                    justifyContent="space-between"
                >
                    {loading ? (
                        <Grid
                            container={true}
                            item={true}
                            justifyContent="center"
                            xs={12}
                            style={{
                                marginTop: 50,
                            }}
                        >
                            <CircularProgress disableShrink />
                        </Grid>
                    ) : recipes.length ? (
                        recipes.map((recipe) => {
                            const calories = Math.ceil(recipe.recipe.calories);
                            return (
                                <Grid
                                    container={true}
                                    item={true}
                                    justifyContent="center"
                                    lg={4}
                                    md={6}
                                    sm={6}
                                    xs={12}
                                    style={{
                                        margin: "10px 0",
                                    }}
                                >
                                    <Card
                                        className={classes.root}
                                        style={{
                                            minWidth: "80%",
                                        }}
                                    >
                                        <CardHeader
                                            action={
                                                <IconButton aria-label="settings">
                                                    <MoreVertIcon />
                                                </IconButton>
                                            }
                                            title={recipe.recipe.label}
                                            subheader={`Calories ${calories}`}
                                        />
                                        <CardMedia
                                            className={classes.media}
                                            image={recipe.recipe.image}
                                            title={recipe.recipe.label}
                                        />
                                        <CardContent>
                                            {recipe.recipe.ingredients.map(
                                                (ingredients, i) => (
                                                    <Typography
                                                        variant="body2"
                                                        color="textSecondary"
                                                        component="p"
                                                        key={i}
                                                    >
                                                        {ingredients.text}
                                                    </Typography>
                                                )
                                            )}
                                        </CardContent>
                                        <CardActions disableSpacing>
                                            <Button
                                                size="small"
                                                color="primary"
                                                href={recipe.recipe.url}
                                                target="_blank"
                                            >
                                                How to cook
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            );
                        })
                    ) : (
                        <Grid
                            container={true}
                            item={true}
                            justifyContent="center"
                            xs={12}
                            style={{
                                marginTop: 50,
                            }}
                        >
                            <Typography variant="h2" component="h2">
                                No recipes .....
                            </Typography>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </Grid>
    );
}
